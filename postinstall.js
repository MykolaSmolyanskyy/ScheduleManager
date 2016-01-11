var fs = require("fs");
try {
	if (process.platform.indexOf("win32") !== -1) {
		fs.unlinkSync("./node_modules/");
	} else {
		fs.unlinkSync("./node_modules");
	}
} catch (e) {}
