var express=require('express');
var app=express();//create the Express app
var bodyParser=require('body-parser');
var cors = require('cors');//to allow access origin
var multer = require('multer');
var group=require('./routes/group');//routes defined
var role=require('./routes/role');
var unit=require('./routes/unit');
var user=require('./routes/user');
var history=require('./routes/history');
var product=require('./routes/product');
var productBalance=require('./routes/productBalance');
var transactionHeader=require('./routes/transactionHeader');
var transactionDetail=require('./routes/transactionDetail');
var path=require('path')
var mongoose=require('mongoose');

var MongoURI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/shop'

mongoose.Promise = global.Promise;
mongoose.connect(MongoURI);

mongoose.connection.once('open', function() {
    console.log('connection established!');
});

mongoose.connection.on('error', function(err) {
    console.error('Could not connect.  Error:', err);
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(multer({dest:'./uploads/'}).any());
app.use('/api', group);
app.use('/api', role);
app.use('/api', unit);
app.use('/api', user);
app.use('/api',history);
app.use('/api', product);
app.use('/api',productBalance);
app.use('/api', transactionHeader);
app.use('/api',transactionDetail);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/*', (req, res) => {
    res.redirect('/');
  });
app.get('/',function(req,res){
        res.json({"Message" : "Hello World !"});
    });


app.listen(3010);
console.log("Listening to port 3000");
