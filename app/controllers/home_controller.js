

function home(req, res) {
    res.render('index', {title: "FORBIDDEN ACCESS ! :)"});
}
function test(req,res){
}

module.exports = {
    home: home,
    test: test
};