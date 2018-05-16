function Controller(){}

function home(req, res) {
    res.render('index', {title: "Welcome on Node Beans App !"});
}

module.exports = {
    home: home
};