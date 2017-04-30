const { app, BrowserWindow, ipcMain } = require("electron")

var knex = require("knex")({
	client: "sqlite3",
	connection: {
		filename: "./database.sqlite"
	}
});

app.on("ready", () => {
	let mainWindow = new BrowserWindow({ height: 800, width: 800, show: false })
	mainWindow.loadURL(`file://${__dirname}/main.html`)
	mainWindow.once("ready-to-show", () => { mainWindow.show() })

	ipcMain.on("mainWindowLoaded", function () {
		let result = knex.select("FirstName").from("User")
		result.then(function(rows){
			mainWindow.webContents.send("resultSent", rows);
		})
	});
});



app.on("window-all-closed", () => { app.quit() })
