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

    if (file.indexOf("cstyle") !== -1 || file.indexOf("pwc") !== -1) {
        try {
            const data = JSON.parse(rawdata);

            const {
                pages: [, , g1, g2],
            } = data;
            
            g1.randomSelect = true;
            g1.randomSelectCount = g1.randomiseQuestionsNumber || 9;
            g1.randomProp = "x";

            g2.randomSelect = true;
            g2.randomSelectCount = g2.randomiseQuestionsNumber || 9;
            g2.randomProp = "y";

            data?.pages.forEach((page) => {
                page.elements?.forEach((el) => {
                    if (el.type === "radiogroup") {
                        el.behavior = "custom-radio";
                    }
                });
            });

            rawdata = JSON.stringify(data);
        } catch (e) {
            console.log(e);
        }
    }

    if (file.indexOf("virtual") !== -1 || file.indexOf("polishing") !== -1) {
        try {
            const data = JSON.parse(rawdata);

            data?.pages.forEach((page) => {
                page.elements?.forEach((el) => {
                    if (el.type === "radiogroup") {
                        el.behavior = "custom-radio";
                        const m = el.title.match(/\(((?:dis)?agree)\)$/);
                        if (m && m[1]) {
                            el.title = el.title.replace(`(${m[1]})`, "").trim();
                            el.correctAnswer = m[1];
                        }
                    }
                });
            });

            const wrong = data?.pages.filter(
                (p) => p.name.slice(-10) === "tips-wrong"
            );

            const right = data?.pages.filter(
                (p) => p.name.slice(-10) === "tips-right"
            );

            if (wrong && wrong.length > 0 && right && right.length > 0) {
                right[0].elements[0].html = wrong[0].elements[0].html.replace(
                    "canSkip={false}",
                    "canSkip={true}"
                );
            }

            rawdata = JSON.stringify(data);
        } catch (e) {
            console.log(e);
        }
    }

    fs.writeFileSync(
        __dirname + "/json/" + file,
        prettier.format(rawdata, { parser: "json", tabWidth: 2 })
    );
}