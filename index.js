const { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path');
const url = require('url');

var knex = require("knex")({
	client: "sqlite3",
	connection: {
		filename: path.join(__dirname, 'database.sqlite')
	}
});

app.on("ready", () => {
	//https://stackoverflow.com/questions/44391448/electron-require-is-not-defined/55908510
        let mainWindow = new BrowserWindow({ height: 500, width: 800, show: false, webPreferences:{ nodeIntegration: true,
												    contextIsolation: false,}})

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'main.html'),
		protocol: 'file',
		slashes: true
	}));
	mainWindow.once("ready-to-show", () => { mainWindow.show() })

	ipcMain.on("mainWindowLoaded", function () {
		let result = knex.select("FirstName").from("User")
		result.then(function(rows){
			mainWindow.webContents.send("resultSent", rows);
		})
	});
});



app.on("window-all-closed", () => { app.quit() })
