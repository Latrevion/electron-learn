const {app,BrowserWindow} =require('electron')

function createWindow(){
    const win = new BrowserWindow({
        width:880,
        height:600
    })
    win.loadFile('index.html')
    win.webContents.openDevTools()
    return win
}
function createSecondWindow(parent){
    const win = new BrowserWindow({
        width:600,
        height:300,
        parent
    })
    win.loadFile('second.html')
}

app.on('ready',()=>{
    const parent =createWindow()
    createSecondWindow(parent)
})