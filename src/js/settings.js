const fs3 = require('fs');

radiusCheck();

ipcRenderer.on("set:changeTheme", (e, _themeMod) => {
    if (_themeMod == "Dark" || _themeMod == "dark") {
        _themeMod = 1;
    }
    _themeMod = parseInt(_themeMod);
    ChangesApply(_themeMod);
});

fs3.readFile('settings.json', 'utf8', function (err, _settingsPreferences) {
    if (!err) {
        var preferences = JSON.parse(_settingsPreferences);
        var tema_deger;
        var siralama_deger;
        var radiusDegeri;
        if (preferences[0].theme == "bright") {
            tema_deger = "bright";
        } else if (preferences[0].theme == "dark") {
            tema_deger = "dark";
        } else {
            tema_deger = "default";
        }
        if (preferences[0].sorting == "id") {
            siralama_deger = "id";
        } else if (preferences[0].sorting == "date") {
            siralama_deger = "date";
        } else if (preferences[0].sorting == "idat") {
            siralama_deger = "idat";
        } else {
            siralama_deger = "id";
        }
        if (preferences[0].itradius == "kskn") {
            radiusDegeri = "kskn";
        } else {
            radiusDegeri = "ymsk";
        }

        IfIssetTrueId("ThemeOptions", function (e) {
            if (e) {
                e.value = tema_deger;
            }
        });

        IfIssetTrueId("SortOptions", function (e) {
            if (e) {
                e.value = siralama_deger;
            }
        });

        IfIssetTrueId("RadiusOptions", function (e) {
            if (e) {
                e.value = radiusDegeri;
            }
        });
    }
});