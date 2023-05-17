document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        Start();
    }
}

const { ipcRenderer } = require("electron");

function electronConnectTest() {
    ipcRenderer.send("key", "[YAVER]: Baglanti calisiyor.");
}

var ColorThemeN = 3;

var radius = true;


function Start() {

    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => {
        if (e.matches) {
            ThemeSet(ColorThemeN);
        } else {
            ThemeSet(ColorThemeN);
        }
    });

    ThemeSet(ColorThemeN);

    radiusCheck();

    YuzdelikYazdir();

    IfIssetTrueClass("ToDo_Item", function (e) {
        if (e) {
            for (let Sayi = 0; Sayi < e.length; Sayi++) {
                e[Sayi].onclick = function () {
                    //EditToDo();
                    let selected = e[Sayi].getAttribute("class").toString();
                    let _selected = selected.split("itemGorevID_");
                    let _2selected = _selected[1].split(" ");
                    selected = _2selected[0];

                    ipcRenderer.send("editPageFor", selected.toString());
                };
            }
        }
    });
    let updateVroadmapDegeri = 0;
    IfIssetTrueId("updateVroadmap", function (e) {
        if (e) {
            IfIssetTrueId("NotRoadMaps", function (e) {
                if (e) {
                    e.classList.add("bunuGoster");
                    e.classList.remove("bunuGosterme");
                }
            });
            IfIssetTrueId("NotRoadMapsD", function (e) {
                if (e) {
                    e.classList.add("bunuGoster");
                    e.classList.remove("bunuGosterme");
                }
            });

            IfIssetTrueId("RoadMaps", function (e) {
                if (e) {
                    e.classList.remove("bunuGoster");
                    e.classList.add("bunuGosterme");
                }
            });
            IfIssetTrueId("RoadMapsD", function (e) {
                if (e) {
                    e.classList.remove("bunuGoster");
                    e.classList.add("bunuGosterme");
                }
            });

            e.addEventListener("click", function () {


                updateVroadmapDegeri++;

                if (updateVroadmapDegeri >= 2) {
                    updateVroadmapDegeri = 0;
                }

                if (updateVroadmapDegeri % 2 != 0) {
                    IfIssetTrueId("NotRoadMaps", function (e) {
                        if (e) {
                            e.classList.remove("bunuGoster");
                            e.classList.add("bunuGosterme");
                        }
                    });
                    IfIssetTrueId("NotRoadMapsD", function (e) {
                        if (e) {
                            e.classList.remove("bunuGoster");
                            e.classList.add("bunuGosterme");
                        }
                    });

                    IfIssetTrueId("RoadMaps", function (e) {
                        if (e) {
                            e.classList.add("bunuGoster");
                            e.classList.remove("bunuGosterme");
                        }
                    });
                    IfIssetTrueId("RoadMapsD", function (e) {
                        if (e) {
                            e.classList.add("bunuGoster");
                            e.classList.remove("bunuGosterme");
                        }
                    });
                } else {
                    IfIssetTrueId("NotRoadMaps", function (e) {
                        if (e) {
                            e.classList.add("bunuGoster");
                            e.classList.remove("bunuGosterme");
                        }
                    });
                    IfIssetTrueId("NotRoadMapsD", function (e) {
                        if (e) {
                            e.classList.add("bunuGoster");
                            e.classList.remove("bunuGosterme");
                        }
                    });

                    IfIssetTrueId("RoadMaps", function (e) {
                        if (e) {
                            e.classList.remove("bunuGoster");
                            e.classList.add("bunuGosterme");
                        }
                    });
                    IfIssetTrueId("RoadMapsD", function (e) {
                        if (e) {
                            e.classList.remove("bunuGoster");
                            e.classList.add("bunuGosterme");
                        }
                    });
                }
            });
        }
    });

    IfIssetTrueId("__closeMain", function (e) {
        if (e) {
            e.onclick = function () {
                ipcRenderer.send("key:isQuiting", "yesQuit");
            }
        }
    });

    IfIssetTrueId("__minimizeMain", function (e) {
        if (e) {
            e.onclick = function () {
                ipcRenderer.send("focusPageMinimize");
            }
        }
    });

    IfIssetTrueId("EditCloseButton", function (e) {
        if (e) {
            e.onclick = function () {
                ipcRenderer.send("key:showPageClose", "edittask");
            }
        }
    });

    IfIssetTrueId("NewJobsCloseButton", function (e) {
        if (e) {
            e.onclick = function () {
                ipcRenderer.send("closeNewPage", "true");
            }
        }
    });

    IfIssetTrueId("UpdateBoxCloseButton", function (e) {
        if (e) {
            e.onclick = function () {
                ipcRenderer.send("closeUpdatePage", "Update");
            }
        }
    });

    IfIssetTrueId("Settings_Box", function (e) {
        if (e) {
            /*if(e.style.display == "none" || e.style.display == "")
            {
              e.style.display = "none";
            }else{
              e.style.display = "block";
            }*/
        }
    });

    IfIssetTrueId("ChangesSaver", function (e) {
        if (e) {
            let gidecekDeger;
            e.onclick = function () {
                IfIssetTrueId("SortOptions", function (e) {
                    if (e) {
                        let gettingValue = e.selectedIndex;
                        gettingValue = parseInt(gettingValue);
                        if (gettingValue == 0) { gettingValue = "id"; } else if (gettingValue == 1) { gettingValue = "date"; } else { gettingValue = "idat"; }
                        gidecekDeger = gettingValue;
                    }
                });
                IfIssetTrueId("ThemeOptions", function (e) {
                    if (e) {
                        let gettingValue = e.selectedIndex;
                        gettingValue = parseInt(gettingValue);
                        let themeMod = 3 - gettingValue;
                        gidecekDeger = gidecekDeger + "/" + String(themeMod);
                    }
                });
                IfIssetTrueId("RadiusOptions", function (e) {
                    if (e) {
                        let gettingValue = e.selectedIndex;
                        gettingValue = parseInt(gettingValue);
                        if (gettingValue == 0) { gettingValue = "ymsk"; } else if (gettingValue == 1) { gettingValue = "kskn"; } else { gettingValue = "ymsk"; }
                        gidecekDeger = gidecekDeger + "/" + String(gettingValue);
                        if (gettingValue == "kskn") { radius = false; } else { radius = true; }
                    }
                });
                alert(gidecekDeger);

                ipcRenderer.send("setting:changingSave", String(gidecekDeger));

            };
        }
    });

    IfIssetTrueId("SettingsShowButton", function (e) {
        if (e) {
            e.onclick = function () {
                ipcRenderer.send("key:newPage", "settings");
            };
        }
    });

    IfIssetTrueId("SettingsCloseButton", function (e) {
        if (e) {
            e.onclick = function () {
                ipcRenderer.send("setting:close", "true");
            };
        }
    });


    IfIssetTrueId("EditCloseButton", function (e) {
        if (e) {
            e.onclick = function () {
                ipcRenderer.send("closeEditPage", "true");
            };
        }
    });

    IfIssetTrueId("UpdateBoxShowButton", function (e) {
        if (e) {
            e.onclick = function () {
                ipcRenderer.send("key:newPage", "Update");
            };
        }
    });

    IfIssetTrueId("NewJobsShowButton", function (e) {
        if (e) {
            e.onclick = function () {
                ipcRenderer.send("key:newPage", "YeniGorev");
            };
        }
    });

    IfIssetTrueId("gTamamlanmasi", function (e) {
        if (e) {
            e.addEventListener("input", function () {
                IfIssetTrueId("YeniGorevYuzdesi", function (a) {
                    if (a) {
                        a.innerHTML = (e.value * 5).toString();
                    }
                });
            });
        }
    });

    egTamamlanmasiYenile();
}

function egTamamlanmasiYenile() {
    IfIssetTrueId("egTamamlanmasi", function (e) {
        if (e) {
            e.addEventListener("input", function () {
                IfIssetTrueId("eskiGorevTamamlanmasi", function (a) {
                    if (a) {
                        a.innerHTML = (e.value * 5).toString();
                    }
                });
            });
        }
    });
}

function EditToDo() {
    let settingsBox = IDAta("Edit_ToDo_Box");
    settingsBox.style.display = "block";
}

function ChangesApply(themeMod) {
    ThemeSet(themeMod);
}


function YuzdelikYazdir() {
    IfIssetTrueClass("Basari", function (BasariCubugu) {
        if (BasariCubugu) {
            for (let Sayi = 0; Sayi < BasariCubugu.length; Sayi++) {
                IfIssetTrueClass("Ilerleme", function (IlerlemeCubugu) {
                    if (IlerlemeCubugu) {
                        IfIssetTrueClass("YuzdelikYazi", function (YuzdelikYaziV) {
                            let temp = Math.round(((BasariCubugu[Sayi].offsetWidth * 100) / IlerlemeCubugu[Sayi].offsetWidth));
                            temp = Yuvarla(temp);
                            YuzdelikYaziV[Sayi].innerHTML = temp.toString();
                        });
                    }
                });
            }
        }
    });
}

function Yuvarla(_gelen) {
    if (_gelen > 95) {
        _gelen = 100;
    } else if (_gelen <= 95 && _gelen > 90) {
        _gelen = 95;
    } else if (_gelen <= 90 && _gelen > 85) {
        _gelen = 90;
    } else if (_gelen <= 85 && _gelen > 80) {
        _gelen = 85;
    } else if (_gelen <= 80 && _gelen > 75) {
        _gelen = 80;
    } else if (_gelen <= 75 && _gelen > 70) {
        _gelen = 75;
    } else if (_gelen <= 70 && _gelen > 65) {
        _gelen = 70;
    } else if (_gelen <= 65 && _gelen > 60) {
        _gelen = 65;
    } else if (_gelen <= 60 && _gelen > 55) {
        _gelen = 60;
    } else if (_gelen <= 55 && _gelen > 50) {
        _gelen = 55;
    } else if (_gelen <= 50 && _gelen > 45) {
        _gelen = 50;
    } else if (_gelen <= 45 && _gelen > 40) {
        _gelen = 45;
    } else if (_gelen <= 40 && _gelen > 35) {
        _gelen = 40;
    } else if (_gelen <= 35 && _gelen > 30) {
        _gelen = 35;
    } else if (_gelen <= 30 && _gelen > 25) {
        _gelen = 30;
    } else if (_gelen <= 25 && _gelen > 20) {
        _gelen = 25;
    } else if (_gelen <= 20 && _gelen > 15) {
        _gelen = 20;
    } else if (_gelen <= 15 && _gelen > 10) {
        _gelen = 15;
    } else if (_gelen <= 10 && _gelen > 5) {
        _gelen = 10;
    } else if (_gelen <= 5 && _gelen > 0) {
        _gelen = 5;
    } else if (_gelen <= 0) {
        _gelen = 0;
    }

    return _gelen;
}

function IDAta(_id) {
    if (typeof (_id) == "string") {
        if (document.getElementById(_id)) {
            _id = "#" + _id;
            let ItemDetailsPop = document.querySelector(_id);
            return ItemDetailsPop;
        }
    }
}

function percentShow(_val) {
    IfIssetTrueId("percentShow", function (e) {
        if (e) {
            e.innerHTML = _val.toString();
        }
    });
}

function OneClassAta(_class) {
    if (typeof (_class) == "string") {
        if (document.getElementById(_class)) {
            _class = "." + _class;
            let ItemDetailsPop = document.querySelector(_class);
            return ItemDetailsPop;
        }
    }
}

function ClassAta(_class) {
    if (typeof (_class) == "string") {
        if (document.getElementById(_class)) {
            _class = "." + _class;
            let ItemDetailsPop = document.querySelectorAll(_class);
        }
    }
}

function IfIssetTrueId(_id, f) {
    if (document.getElementsByClassName(_id)) {
        _id = "#" + _id;
        var IssetID = document.querySelector(_id);
        if (typeof (f === 'function')) {
            f(IssetID);
        }
    }
}

function IfIssetTrueClass(_class, f) {
    if (document.getElementsByClassName(_class)) {
        _class = "." + _class;
        var IssetClasses = document.querySelectorAll(_class);
        if (typeof (f === 'function')) {
            f(IssetClasses);
        }
    }
}

function ThemeSet(themeType) {

    let color;
    switch (themeType) {
        case 3:
            ColorThemeN = 3;
            if (window.matchMedia) {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    color = "Dark";
                } else {
                    color = "Bright";
                }
            } else {
                color = "Dark";
            }
            break;
        case 2:
            ColorThemeN = 2;
            color = "Bright";
            break;
        case 1:
            ColorThemeN = 1;
            color = "Dark";
            break;
        default:
            color = "Bright";

    }

    for (let a = 0; a < 2; a++) {
        let lastColor;
        if (a == 0) {
            lastColor = "Bright";
        } else { lastColor = "Dark" }
        IfIssetTrueClass("Body_" + lastColor, function (e) {
            if (e) {
                let control = "Body_" + lastColor;
                for (let a = 0; a < e.length; a++) {
                    let adding = "Body_" + color;
                    if (control == adding) { } else {
                        e[a].classList.add(adding);
                        e[a].classList.remove("Body_" + lastColor);
                    }
                }
            }
        });

        IfIssetTrueClass("ToDo_" + lastColor, function (e) {
            if (e) {
                let control = "ToDo_" + lastColor;
                for (let a = 0; a < e.length; a++) {
                    let adding = "ToDo_" + color;
                    if (control == adding) { } else {
                        e[a].classList.add(adding);
                        e[a].classList.remove("ToDo_" + lastColor);
                    }
                }
            }
        });
        //Box_Bright
        IfIssetTrueClass("Box_" + lastColor, function (e) {
            if (e) {
                let control = "Box_" + lastColor;
                for (let a = 0; a < e.length; a++) {
                    let adding = "Box_" + color;
                    if (control == adding) { } else {
                        e[a].classList.add(adding);
                        e[a].classList.remove("Box_" + lastColor);
                    }
                }

            }
        });

        IfIssetTrueClass("Item_" + lastColor, function (e) {
            if (e) {
                let control = "Item_" + lastColor;
                for (let a = 0; a < e.length; a++) {
                    let adding = "Item_" + color;
                    if (control == adding) { } else {
                        e[a].classList.add(adding);
                        e[a].classList.remove("Item_" + lastColor);
                    }
                }
            }
        });

    }

}

function radiusCheck() {
    if (!radius) {
        IfIssetTrueId("__mainHeader", function (e) {
            if (e) {
                e.classList.add("no-radius");
            }
        });
        let tempInput = document.getElementsByTagName("input");
        if (tempInput.length > 0) {
            for (let a = 0; a < tempInput.length; a++) {
                tempInput[a].className += " no-radius";
            }
        }
        let tempSelect = document.getElementsByTagName("select");
        if (tempSelect.length > 0) {
            for (let a = 0; a < tempSelect.length; a++) {
                tempSelect[a].className += " no-radius";
            }
        }
        IfIssetTrueClass("Button", function (e) {
            if (e) {
                for (let a = 0; a < e.length; a++) {
                    e[a].className += " no-radius";
                }
            }
        });
        IfIssetTrueClass("ToDo_Block", function (e) {
            if (e) {
                for (let a = 0; a < e.length; a++) {
                    e[a].className += " no-radius";
                }
            }
        });
        IfIssetTrueClass("ToDo_Item", function (e) {
            if (e) {
                for (let a = 0; a < e.length; a++) {
                    e[a].className += " no-radius";
                }
            }
        });
        IfIssetTrueClass("YuzdelikYazi", function (e) {
            if (e) {
                for (let a = 0; a < e.length; a++) {
                    e[a].className += " no-radius";
                }
            }
        });
        IfIssetTrueClass("UpdateVSlider", function (e) {
            if (e) {

                IfIssetTrueClass("__slide-button", function (c) {
                    if (c) {
                        for (let a = 0; a < c.length; a++) {
                            c[a].className += " no-radius";
                        }
                    }
                });
                for (let a = 0; a < e.length; a++) {
                    e[a].className += " no-radius";
                }
            }
        });
        IfIssetTrueClass("Updates", function (e) {
            if (e) {
                IfIssetTrueClass("Desc", function (c) {
                    if (c) {
                        for (let a = 0; a < c.length; a++) {
                            c[a].className += " no-radius";
                        }
                    }
                });
                for (let a = 0; a < e.length; a++) {
                    e[a].className += " no-radius";
                }
            }
        });
    } else {

        IfIssetTrueId("__mainHeader", function (e) {
            if (e) {
                e.classList.remove("no-radius");
            }
        });
        let tempInput = document.getElementsByTagName("input");
        if (tempInput.length > 0) {
            for (let a = 0; a < tempInput.length; a++) {
                tempInput[a].classList.remove("no-radius");
            }
        }
        let tempSelect = document.getElementsByTagName("select");
        if (tempSelect.length > 0) {
            for (let a = 0; a < tempSelect.length; a++) {
                tempSelect[a].classList.remove("no-radius");
            }
        }
        IfIssetTrueClass("Button", function (e) {
            if (e) {
                for (let a = 0; a < e.length; a++) {
                    e[a].classList.remove("no-radius");
                }
            }
        });
        IfIssetTrueClass("ToDo_Block", function (e) {
            if (e) {
                for (let a = 0; a < e.length; a++) {
                    e[a].classList.remove("no-radius");
                }
            }
        });
        IfIssetTrueClass("ToDo_Item", function (e) {
            if (e) {
                for (let a = 0; a < e.length; a++) {
                    e[a].classList.remove("no-radius");
                }
            }
        });
        IfIssetTrueClass("YuzdelikYazi", function (e) {
            if (e) {
                for (let a = 0; a < e.length; a++) {
                    e[a].classList.remove("no-radius");
                }
            }
        });
        IfIssetTrueClass("UpdateVSlider", function (e) {
            if (e) {

                IfIssetTrueClass("__slide-button", function (c) {
                    if (c) {
                        for (let a = 0; a < c.length; a++) {
                            c[a].classList.remove("no-radius");
                        }
                    }
                });
                for (let a = 0; a < e.length; a++) {
                    e[a].classList.remove("no-radius");
                }
            }
        });
        IfIssetTrueClass("Updates", function (e) {
            if (e) {
                IfIssetTrueClass("Desc", function (c) {
                    if (c) {
                        for (let a = 0; a < c.length; a++) {
                            c[a].classList.remove("no-radius");
                        }
                    }
                });
                for (let a = 0; a < e.length; a++) {
                    e[a].classList.remove("no-radius");
                }
            }
        });
    }
}