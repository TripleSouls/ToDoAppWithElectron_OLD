
ipcRenderer.on("notClickable", (e, data) => {
    IfIssetTrueId("Engelleyici", function (e) {
        if (e) {
            if (data == true) {
                e.style.display = "block";
                radiusCheck();
            } else {
                e.style.display = "none";
                radiusCheck();
            }
        }
    });
});

ipcRenderer.on("set:changeTheme", (err, _themeMod) => {
    _themeMod = parseInt(_themeMod);
    ChangesApply(_themeMod);
});

ipcRenderer.on("set:sortingMode", (err, _sortingMode) => {
    ___sortingMode = _sortingMode;
});

ipcRenderer.on("set:radiusMode", (err, _radiusM) => {
    ___radiusMode = _radiusM;
    if (___radiusMode == "kskn") {
        radius = false;
    } else {
        radius = true;
    }
    radiusCheck();
});

var todos;
var tercihler = ["bright", "none", "default", "date", "ymsk"];
var ___sortingMode;
var ___radiusMode;

ipcRenderer.on("settings:preferences", (e, _settingspreferencesJSONString) => {
    let _tercihler = JSON.parse(_settingspreferencesJSONString);
    tercihler[0] = _tercihler[0].theme;
    tercihler[1] = _tercihler[0].blindMode;
    tercihler[2] = _tercihler[0].textSize;
    tercihler[3] = _tercihler[0].sorting;
    tercihler[4] = _tercihler[0].itradius;
    if (tercihler[0] == "bright") {
        ColorThemeN = 2;
    } else if (tercihler[0] == "dark") {
        ColorThemeN = 1;
    } else {
        ColorThemeN = 3;
    }

    ___sortingMode = tercihler[3];
    ___radiusMode = tercihler[4];
    ThemeSet(ColorThemeN);
    if (___radiusMode == "kskn") {
        radius = false;
    } else {
        radius = true;
    }
    radiusCheck();
});

function sortAll(_todos) {
    if (___sortingMode == "id") {
        for (let a = 0; a < _todos.length; a++) {
            for (let b = 0; b < _todos.length; b++) {
                if (b + 1 >= _todos.length) {
                    break;
                }
                if (_todos[b].gorevID < _todos[b + 1].gorevID) {
                    let tempGorevAdi = _todos[b].gorevAdi;
                    let tempGorevAciklamasi = _todos[b].gorevAciklamasi;
                    let tempGorevTamamlanmasi = _todos[b].gorevTamamlanmasi;
                    let tempGorevID = _todos[b].gorevID;
                    let tempGorevST = _todos[b].gorevSonTarihi;

                    _todos[b].gorevAdi = _todos[b + 1].gorevAdi;
                    _todos[b].gorevAciklamasi = _todos[b + 1].gorevAciklamasi;
                    _todos[b].gorevTamamlanmasi = _todos[b + 1].gorevTamamlanmasi;
                    _todos[b].gorevID = _todos[b + 1].gorevID;
                    _todos[b].gorevSonTarihi = _todos[b + 1].gorevSonTarihi;

                    _todos[b + 1].gorevAdi = tempGorevAdi;
                    _todos[b + 1].gorevAciklamasi = tempGorevAciklamasi;
                    _todos[b + 1].gorevTamamlanmasi = tempGorevTamamlanmasi;
                    _todos[b + 1].gorevID = tempGorevID;
                    _todos[b + 1].gorevSonTarihi = tempGorevST;
                }
            }
        }
    } else if (___sortingMode == "date") {
        for (let a = 0; a < _todos.length; a++) {
            for (let b = 0; b < _todos.length; b++) {
                if (b + 1 >= _todos.length) {
                    break;
                }
                let birinci = _todos[b].gorevSonTarihi;
                let sonuc_birinci;
                if (birinci == null || (birinci == "" || birinci == "0000-00-00")) {
                    sonuc_birinci = 0;
                } else {
                    birinci = birinci.split("-");
                    sonuc_birinci = parseInt(birinci[0]) * 360 + parseInt(birinci[1]) * 30 + parseInt(birinci[2]);
                }

                let ikinci = _todos[b + 1].gorevSonTarihi;
                let sonuc_ikinci;
                if (ikinci == null || (ikinci == "" || ikinci == "0000-00-00")) {
                    sonuc_ikinci = 0;
                } else {
                    ikinci = ikinci.split("-");
                    sonuc_ikinci = parseInt(ikinci[0]) * 360 + parseInt(ikinci[1]) * 30 + parseInt(ikinci[2]);
                }
                if (sonuc_birinci < sonuc_ikinci) {
                    let tempGorevAdi = _todos[b].gorevAdi;
                    let tempGorevAciklamasi = _todos[b].gorevAciklamasi;
                    let tempGorevTamamlanmasi = _todos[b].gorevTamamlanmasi;
                    let tempGorevID = _todos[b].gorevID;
                    let tempGorevST = _todos[b].gorevSonTarihi;

                    _todos[b].gorevAdi = _todos[b + 1].gorevAdi;
                    _todos[b].gorevAciklamasi = _todos[b + 1].gorevAciklamasi;
                    _todos[b].gorevTamamlanmasi = _todos[b + 1].gorevTamamlanmasi;
                    _todos[b].gorevID = _todos[b + 1].gorevID;
                    _todos[b].gorevSonTarihi = _todos[b + 1].gorevSonTarihi;

                    _todos[b + 1].gorevAdi = tempGorevAdi;
                    _todos[b + 1].gorevAciklamasi = tempGorevAciklamasi;
                    _todos[b + 1].gorevTamamlanmasi = tempGorevTamamlanmasi;
                    _todos[b + 1].gorevID = tempGorevID;
                    _todos[b + 1].gorevSonTarihi = tempGorevST;
                }
            }
        }
    } else {
        for (let a = 0; a < _todos.length; a++) {
            for (let b = 0; b < _todos.length; b++) {
                if (b + 1 >= _todos.length) {
                    break;
                }
                let birinci = _todos[b].gorevSonTarihi;
                let sonuc_birinci;
                if (birinci == null || (birinci == "" || birinci == "0000-00-00")) {
                    sonuc_birinci = 0;
                } else {
                    birinci = birinci.split("-");
                    sonuc_birinci = parseInt(birinci[0]) * 360 + parseInt(birinci[1]) * 30 + parseInt(birinci[2]) * parseInt(_todos[b].gorevID);
                }

                let ikinci = _todos[b + 1].gorevSonTarihi;
                let sonuc_ikinci;
                if (ikinci == null || (ikinci == "" || ikinci == "0000-00-00")) {
                    sonuc_ikinci = 0;
                } else {
                    ikinci = ikinci.split("-");
                    sonuc_ikinci = parseInt(ikinci[0]) * 360 + parseInt(ikinci[1]) * 30 + parseInt(ikinci[2]) * parseInt(_todos[b + 1].gorevID);
                }
                if (sonuc_birinci < sonuc_ikinci) {
                    let tempGorevAdi = _todos[b].gorevAdi;
                    let tempGorevAciklamasi = _todos[b].gorevAciklamasi;
                    let tempGorevTamamlanmasi = _todos[b].gorevTamamlanmasi;
                    let tempGorevID = _todos[b].gorevID;
                    let tempGorevST = _todos[b].gorevSonTarihi;

                    _todos[b].gorevAdi = _todos[b + 1].gorevAdi;
                    _todos[b].gorevAciklamasi = _todos[b + 1].gorevAciklamasi;
                    _todos[b].gorevTamamlanmasi = _todos[b + 1].gorevTamamlanmasi;
                    _todos[b].gorevID = _todos[b + 1].gorevID;
                    _todos[b].gorevSonTarihi = _todos[b + 1].gorevSonTarihi;

                    _todos[b + 1].gorevAdi = tempGorevAdi;
                    _todos[b + 1].gorevAciklamasi = tempGorevAciklamasi;
                    _todos[b + 1].gorevTamamlanmasi = tempGorevTamamlanmasi;
                    _todos[b + 1].gorevID = tempGorevID;
                    _todos[b + 1].gorevSonTarihi = tempGorevST;
                }
            }
        }
    }

    return _todos;
}

ipcRenderer.on("json:todos", (e, _todosJSONString) => {
    todos = JSON.parse(_todosJSONString);
    let sortedTodos;
    sortedTodos = sortAll(todos);
    let writeTaskDiv = "";
    for (let a = 0; a < sortedTodos.length; a++) {
        if (sortedTodos[a].gorevTamamlanmasi == "99") {
            writeTaskDiv += "<div class='ToDo_Item Item_Bright itemGorevID_" + sortedTodos[a].gorevID.toString() + "'><h3 class='GorevAdi'>" + sortedTodos[a].gorevAdi + "</h3><p class='GorevAciklamasi'>" + sortedTodos[a].gorevAciklamasi + "</p><div class='Ilerleme'><div class='Basari b100'></div><p class='YuzdelikYazi'>100</p></div></div>";
        } else if (sortedTodos[a].gorevTamamlanmasi.length < 2) {
            writeTaskDiv += "<div class='ToDo_Item Item_Bright itemGorevID_" + sortedTodos[a].gorevID.toString() + "'><h3 class='GorevAdi'>" + sortedTodos[a].gorevAdi + "</h3><p class='GorevAciklamasi'>" + sortedTodos[a].gorevAciklamasi + "</p><div class='Ilerleme'><div class='Basari b" + parseInt(sortedTodos[a].gorevTamamlanmasi) * 10 + "'></div><p class='YuzdelikYazi'>" + parseInt(sortedTodos[a].gorevTamamlanmasi) * 10 + "</p></div></div>";
        } else {
            let cevirici = parseInt(sortedTodos[a].gorevTamamlanmasi[0]);
            let cevirici2 = parseInt(sortedTodos[a].gorevTamamlanmasi[1]);
            cevirici = cevirici * 2;
            cevirici = cevirici + cevirici2;
            writeTaskDiv += "<div class='ToDo_Item Item_Bright itemGorevID_" + sortedTodos[a].gorevID.toString() + "'><h3 class='GorevAdi'>" + sortedTodos[a].gorevAdi + "</h3><p class='GorevAciklamasi'>" + sortedTodos[a].gorevAciklamasi + "</p><div class='Ilerleme'><div class='Basari b" + cevirici * 5 + "'></div><p class='YuzdelikYazi'>" + cevirici * 5 + "</p></div></div>";
        }
    }
    IfIssetTrueClass("ToDo_Items", function (e) {
        if (e) {
            e[0].innerHTML = writeTaskDiv;
        }
    });
    Start();
});