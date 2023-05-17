ipcRenderer.on("set:changeTheme", (e, _themeMod) => {
    if (_themeMod == "Dark" || _themeMod == "dark") {
        _themeMod = 1;
    }
    _themeMod = parseInt(_themeMod);
    ChangesApply(_themeMod);
});

radiusCheck();