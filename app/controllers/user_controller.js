/**
 * Users controller
 */
module.exports = {
    showSignup: showSignup,
    processSignup: processSignup,
    processLogin: processLogin,
    processLogout: processLogout
};
const 
    User                = require('../../models/user'),
    crypto = require('crypto');

/* renvoie un mot de passe haché en sha256 à partir d'un mot de passe */
function hashPW(pwd) {
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
};

/**
 * Show user signup page
 */
function showSignup(req, res) {
    res.render('signup', { title: 'Signup' });
}

/**
 * Create user account
 */
function processSignup(req, res) {

    //req.query pour les get, req.body pour les post
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(401);
        if (!req.body.username) console.log('User name not provided');
        if (!req.body.email) console.log('Email not provided');
        if (!req.body.password) console.log('Password not provided');
        res.render('signup', { title: 'Signup'});
        return;
    }
    //console.log('signup ok -> find user '); // on vérif si l'user n'existe pas:
    User.findOne({ username: req.body.username }, function (err, doc) {
        if (err) {
            throw err;
        }
        if (doc) {
            res.status(403);
            console.log('User already exists');
            res.render('signup', { title: 'Signup'});
            return;
        }
        //sinon, on crée le mdp
        var myhash = hashPW(req.body.password.toString());
        //on enregistre le nouvel utilisateur
        var date = new Date();
        var user = new User({
            username: req.body.username,
            hashed_password: myhash,
            email: req.body.email,
            date: date
        });
        user.save(function (err) {
            if (err) {
                throw err;
            }
            console.log('Account successfully created !');
            res.render('signup', { title: 'Signup', success: true });
        });
    });
}

/**
 * Log in user
 */
function processLogin(req, res) {
    User.findOne({ username: req.body.username }, function (err, doc) {
        if (err) throw err;
        if (!doc) {
            console.log('Wrong credentials');
            res.redirect('/');
            return;
        }
        if (hashPW(req.body.password) == doc.hashed_password) {
            req.session.userId = doc._id;
            req.session.user = doc;
            req.session.save(function (err) {
            });

            res.redirect('/bills/out');
            return;
        }
        else {
            console.log('Wrong credentials');
            res.redirect('/');
        }
    });
}

/**
 * Log out user
 */
function processLogout(req, res) {
    req.session.destroy();
    res.clearCookie('log');
    console.log('User successfully logged out' )
    res.redirect('/');
}
