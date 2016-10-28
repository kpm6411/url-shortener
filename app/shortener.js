module.exports = function(app, db){
    const appUrl = "https://fcc-projects-kpm6411.c9users.io/";
    var urls = db.collection('urls');
    
    app.get('/', function (req, res) {
      res.render('index.jade');
    });
    
    app.get('/new/:url', function(req, res){
        var url = 'http://' + req.url.slice(5);
        var id = Math.floor(Math.random()*10000);
        var urlObj = {
            original_url: url,
            short_url: appUrl + id
        };
        res.json(urlObj);
        urls.save(urlObj);
    });
    
    app.get('/:index',function(req,res){
        var index = req.params.index;
        var short = appUrl + index;
        urls.findOne({short_url: short}, function(err,doc){
            if (err) throw err;
            console.log('Redirecting to: ' + doc.original_url);
            res.redirect(doc.original_url);
        });
    });
};