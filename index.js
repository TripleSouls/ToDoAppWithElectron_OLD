const electron = require("electron");
const url = require("url");
const path = require("path");
const fs = require('fs');

const { app, BrowserWindow, dialog ,Menu, ipcMain, ipcRenderer } = electron
let mainWindow;
var mainTheme;
var isItRadius;

app.on('ready', () => {
    console.log("[YAVER]: Uygulama calisabilir durumda.");
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            transparent: true, 
            contextIsolation: false
        },
        frame: true,
        titleBarStyle: 'hidden',
        resizable: true,
        height: 700,
        width: 490
    });

    mainWindow.loadURL(
        url.format ({
            pathname : path.join(__dirname, "main.html"),
            protocol: "file:",
            slashes: true
        })
    );

    if(fs.existsSync(path.join(process.cwd(), "settings.json"))){
        var settingsdata = fs.readFileSync(path.join(process.cwd(), "settings.json"), {encoding:'utf8', flag:'r+'});
        mainWindow.webContents.once('dom-ready', () => {
            let tempSettingsData = JSON.parse(settingsdata);
            mainTheme = tempSettingsData[0].theme;
            if(tempSettingsData[0].itradius){
                if(tempSettingsData[0].itradius == "no")
                {  
                    isItRadius = false;
                }else{
                    isItRadius = true;
                }
            }else{
                isItRadius = true;
            }
            mainWindow.webContents.send("settings:preferences", settingsdata);
        });
    }else{
        fs.openSync(path.join(process.cwd(), 'settings.json'), 'w', 0o666);
        fs.writeFileSync(path.join(process.cwd(), 'settings.json'), '[ {"theme":"default","blindMode":"none","textSize":"default","sorting":"date","itradius":"yes"} ]');
        var settingsdata = fs.readFileSync("settings.json", {encoding:'utf8', flag:'r+'});
        mainWindow.webContents.once('dom-ready', () => {
            mainWindow.webContents.send("settings:preferences", settingsdata);
        });
    }

    if(fs.existsSync(path.join(process.cwd(), "todos.json"))){
        var todosdata = fs.readFileSync(path.join(process.cwd(), "todos.json"), {encoding:'utf8', flag:'r+'});
        mainWindow.webContents.once('dom-ready', () => {
            mainWindow.webContents.send("json:todos", todosdata);
        });
    }else{
        fs.openSync(path.join(process.cwd(), 'todos.json'), 'w', 0o666);
        fs.writeFileSync(path.join(process.cwd(), 'todos.json'), '[{"gorevAdi":"Hoş Geldiniz","gorevAciklamasi":"-","gorevTamamlanmasi":"10","gorevID":1,"gorevSonTarihi":"2021-06-30"}]');  
        var todosdata = fs.readFileSync("todos.json", {encoding:'utf8', flag:'r+'});
        mainWindow.webContents.once('dom-ready', () => {
            mainWindow.webContents.send("json:todos", todosdata);
        });
    }

    if(fs.existsSync(path.join(process.cwd(), "ended_todos.json"))){
    }else{
        fs.openSync(path.join(process.cwd(), 'ended_todos.json'), 'w', 0o666);
        fs.writeFileSync(path.join(process.cwd(), 'todos.json'), '[{"gorevAdi":"Örnek Biten Görev","gorevAciklamasi":"-","gorevTamamlanmasi":"10","gorevID":1}]');  
    }

    

    mainWindow.on("close", () => {
        app.quit();
    });

    ipcMain.on("key:isQuiting", (err, data) => {
        if(data == "yesQuit"){
            app.quit();
        }
    });

    ipcMain.on("focusPageMinimize", (err, data) => {
        mainWindow.minimize();
    });

    ipcMain.on("key:newPage", (err, data) => {
        newPage(data);
        showPage.webContents.once("dom-ready", () => {
            showPage.webContents.send("set:changeTheme",mainTheme);
        });
    });

    ipcMain.on("editPageFor", (err, taskID) => {
        editPageShow(taskID);
        editPage.webContents.once('dom-ready', () => {
            editPage.webContents.send("editPageTaskID", taskID);
            editPage.webContents.send("set:changeTheme",mainTheme);
        });
    });

    ipcMain.on("setting:changingSave", (err, _gelen) => {
        if(_gelen)
        {
            _gelen = _gelen.split("/");
            let _sorting = _gelen[0];
            
            let _radius = _gelen[2];
            

            let _themeMod = _gelen[1];
            mainTheme = _themeMod;
            let _writeable;
            if(_themeMod == 2)
            {
                _writeable = "bright";
            }else if(_themeMod == 1)
            {
                _writeable = "dark";
            }else{
                _writeable = "default";
            }


            let savedPreferences = {theme: "dark", blindMode: "none", textSize: "default", sorting: "id", itradius : "ymsk"}; //{"theme":"dark", "blindMode":"none", "textSize":"default"}
            savedPreferences.theme = _writeable;
            savedPreferences.blindMode = "none";
            savedPreferences.textSize = "default";
            savedPreferences.sorting = _sorting;
            savedPreferences.itradius = _radius;//BURADA
            let saveblePreferences = JSON.stringify(savedPreferences);
            saveblePreferences = "[ "+saveblePreferences.toString()+" ]";
            fs.writeFileSync('settings.json', saveblePreferences);

            mainWindow.webContents.send("set:changeTheme", _themeMod);
            mainWindow.webContents.send("set:sortingMode", _sorting);
            mainWindow.webContents.send("set:radiusMode", _radius);

            var todosdata = fs.readFileSync("todos.json", {encoding:'utf8', flag:'r+'});
            mainWindow.webContents.send("json:todos", todosdata);

            showPage.close();
            showPage = null;
        }
        
    });

    ipcMain.on("setting:close", (err, data) => {
        if(data == "true"){
            showPage.close();
            showPage = null;
        }
    });

    ipcMain.on("taskEdited", (err, data) => {
        if(data == "true")
        {
            var todosdata = fs.readFileSync("todos.json", {encoding:'utf8', flag:'r+'});
            mainWindow.webContents.send("json:todos", todosdata);
        }
    });

    ipcMain.on("taskAdded", (err, data) => {
        if(data == "true")
        {
            var todosdata = fs.readFileSync("todos.json", {encoding:'utf8', flag:'r+'});
            mainWindow.webContents.send("json:todos", todosdata);
        }
    });

    ipcMain.on("closeEditPage", (e, data)=>{
            editPage.close();
            editPage = null;
    });

    ipcMain.on("closeNewPage", (e, data)=>{
        showPage.close();
        showPage = null;
    });

    ipcMain.on("closeUpdatePage", (e, data)=>{
        showPage.close();
        showPage = null;
    });
    
    
});

function editPageShow(_taskID)
{
    _name = "editTask.html";
    _width = 350;
    _height = 450;
    
    editPage = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            transparent: true, 
            contextIsolation: false
        },
        frame: false,
        titleBarStyle: 'hidden',
        resizable: false,
        height: _height,
        width: _width
    });
    
    mainWindow.send("notClickable",true);

    editPage.loadURL(
        url.format ({
            pathname : path.join(__dirname, _name),
            protocol: "file:",
            slashes: true
        })
    );

    editPage.on("close", () => {
        mainWindow.send("notClickable",false);
        editPage = null;
    });
}

function newPage(_pageName)
{
    let _name;
    let _width;
    let _height;

    switch(_pageName){
        case "Update":
            _name = "update.html";
            _width = 400;
            _height = 472;
        break;
        case "settings":
            _name = _pageName + ".html";
            _width = 400;
            _height = 660;
        break;
        case "YeniGorev":
            _name = "newtask.html";
            _width = 350;
            _height = 450;
        break;
        case "editTask":
            _name = "edittask.html";
            _width = 350;
            _height = 450;
        break;
        default:
            _name = _pageName + ".html";
            _width = 480;
            _height = 140;
        break;
    }

    showPage = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            transparent: true, 
            contextIsolation: false
        },
        frame: true,
        titleBarStyle: 'hidden',
        resizable: true,
        height: _height,
        width: _width
    });

    showPage.loadURL(
        url.format ({
            pathname : path.join(__dirname, _name),
            protocol: "file:",
            slashes: true
        })
    );
    
    mainWindow.send("notClickable",true);

    showPage.on("close", () => {
        mainWindow.send("notClickable",false);
        showPage = null;
    });
}