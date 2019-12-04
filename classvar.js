var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xml2js = require('xml2js'),
    xmlParse = require('xslt-processor').xmlParse,
    xsltProcess = require('xslt-processor').xsltProcess;

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, '')));
router.use(express.urlencoded({extended: true}));
router.use(express.json());
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


router.get('/', function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});

    var xml=fs.readFileSync('Florence_Discography.xml', 'utf8');
    var xsl=fs.readFileSync('Florence_Discography.xsl', 'utf8');
    //console.log(xml);
    var doc = xmlParse(xml);
    var stylesheet = xmlParse(xsl);

    var result = xsltProcess(doc, stylesheet);

     res.end(result.toString());
   //res.end(JSON.stringify({}))
   //console.log("Hello World")

});

server.listen(process.env.PORT || 3000, process.env.IP, function(){
var addr = server.address();
console.log("Server is listening at", addr.address + ":" + addr.port)
});