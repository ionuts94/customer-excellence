const path = require("path");
const fs = require("fs");
const prettier = require("prettier");

//joining path of directory
const directoryPath = path.join(__dirname, "hashes");
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        process(file);
    });
});

function process(file) {
    console.log(file);

    let rawdata = fs.readFileSync(__dirname + "/hashes/" + file, "utf8");

    rawdata = rawdata.replace(/^(\s*)(\w+):/gm, '$1"$2":');
    fs.writeFileSync(
        __dirname + "/json/" + file,
        prettier.format(rawdata, { parser: "json", tabWidth: 2 })
    );
}