function Controller(){}

function home(req, res) {
    res.render('index', {title: "Welcome on Node Beans App !"});
}
function test(req,res){
    console.log(req.body);
    res.send(req.body);
}

module.exports = {
    home: home,
    test: test
};