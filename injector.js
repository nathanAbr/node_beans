const fs = require('fs');

function injectHTML(res, fileNameToInject, dataToInject = null){
    fs.readFile('./views/templates/' + fileNameToInject + '_view.ejs', 'utf8', (err, data) =>{
        if (err) {
            return console.log(err);
        } else {
            res.render('index', {inject:data, data:dataToInject})
        }
    })
}

module.exports = {
    injectHTML:injectHTML,
}