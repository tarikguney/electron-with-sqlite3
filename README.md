# Purpose

This repository contains sample code for the following areas:

1. Creating a new `BrowserWindow` and how to show and destroy it from the `MainProcess`.
2. Sending data between `RendererProcess` and `MainProcess` in Electron app.
3. Using `IPCRenderer` and `IPCMain` objects.
4. Connecting `Sqlite3` using `Knex` library.
5. Building and reading queries using `Knex` library.

The shortcut for showing dev tools on windows in Electron is `Command` + `Alt` + `I` on MacOS.

# Notes

When sending data between `RenderProcess` and `MainProcess`, there are two important code pieces:

1. `IPCMain` and `IPCRenderer`
2. `BrowserWindow.webContents.send()`

`WebContents` contains events, etc. for a window. `IPC` means inter-process communication. The idea here is events. You can fire an event by using `send()` method along with data to pass, and the subscribers listening to it get the data passed. 

Also, when I was working with `Sqlite3`, I got errors with it not being found. Therfore, I had to install `electron-rebuild` dev-dependency and rebuilt the `electron` with it by calling `npm run rebuild`. `package.json` has the setting for the rebuild command.

