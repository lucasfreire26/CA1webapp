//this code was adapted from Mikhail's code at: https://github.com/mikhail-cct/CA1-In-class-Demo

var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xml2js = require('xml2js'),
    xmlParse = require('xslt-processor').xmlParse,
    // Sanitization
    expAutoSan = require('express-autosanitizer'),
    xsltProcess = require('xslt-processor').xsltProcess;

var router = express();
var server = http.createServer(router);git

router.use(express.static(path.resolve(__dirname, 'views')));
router.use(express.urlencoded({extended: true}));
router.use(express.json());
router.use(expAutoSan.all);
// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
};
//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.writeFile(filepath, xml, cb);
};


//router.get('/', function(req, res) {

  //  res.render('Florence_Discography');

//})

router.get('/', function(req, res) {
     const index = fs.readFileSync('views/Florence_Discography.html', 'utf-8');
     res.end(index);
})

    router.get('/get/html', function(req, res) {


    res.writeHead(200, {'Content-Type': 'text/html'});

    var xml=fs.readFileSync('views/Florence_Discography.xml', 'utf8');
    var xsl=fs.readFileSync('views/Florence_Discography.xsl', 'utf8');
    //console.log(xml);
    var doc = xmlParse(xml);
    var stylesheet = xmlParse(xsl);

    var result = xsltProcess(doc, stylesheet);

     res.end(result.toString());
   //res.end(JSON.stringify({}))
   //console.log("Hello World")

});

router.post('/post/json', function(req, res) {
    //console.log(req.body);
    // Function to read in a JSON file, add to it & convert to XML
    function appendJSON(obj) {
        //console.log(obj);
        // Function to read in XML file, convert it to JSON, add a new object and write back to XML file
        xmlFileToJs('views/Florence_Discography.xml', function(err, result) {
        if (err) throw (err);
       // console.log(obj.name);
        result.florenceDiscography.cd.push({'title': obj.title, 'img': 'img', 'yearOfRelease': obj.year, 'price': obj.price});
       // console.log(result);
        jsToXmlFile('views/Florence_Discography.xml', result, function(err) {
            if (err) console.log(err);
        })
        })
    }

  // Call appendJSON function and pass in body of the current POST request

  appendJSON(req.body);

  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');
 
});


// POST request to add to JSON & XML files
router.post('/post/delete', function(req, res) {
    console.log('deleting')
  // Function to read in a JSON file, add to it & convert to XML
  function deleteJSON(obj) {
    // Function to read in XML file, convert it to JSON, delete the required object and write back to XML file
    xmlFileToJs('views/Florence_Discography.xml', function(err, result) {
      if (err) throw (err);
      //This is where we delete the object based on the position of the section and position of the entree, as being passed on from index.html
      delete result.florenceDiscography.cd[obj.cd];
      //This is where we convert from JSON and write back our XML file
      jsToXmlFile('views/Florence_Discography.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  }

  // Call appendJSON function and pass in body of the current POST request
  deleteJSON(req.body);

});

//This is where we as the server to be listening to user with a specified IP and Port

server.listen(process.env.PORT || 3000, process.env.IP, function(){
var addr = server.address();
console.log("Server is listening at", addr.address + ":" + addr.port)
});