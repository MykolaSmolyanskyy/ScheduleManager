var fs = require("fs");
try {
	if (process.platform.indexOf("win32") !== -1) {
		fs.symlinkSync("./src/main/webapp/modules/", "./node_modules/", "junction");
	} else {
		fs.symlinkSync("./src/main/webapp/modules/", "./node_modules", "dir");
	}
} catch (e) {}
