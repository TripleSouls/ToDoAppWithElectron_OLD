const fs_edittask = require('fs');
const fs_endedtask = require('fs');


radiusCheck();

ipcRenderer.on("set:changeTheme", (e, _themeMod) => {
    if (_themeMod == "Dark" || _themeMod == "dark") {
        _themeMod = 1;
    }
    _themeMod = parseInt(_themeMod);
    ChangesApply(_themeMod);
});

ipcRenderer.on("editPageTaskID", (e, gelenTaskID) => {
    fs_edittask.readFile('todos.json', 'utf8', function (err, todosdata) {
        if (!err) {
            var todos = JSON.parse(todosdata);
            for (let a = 0; a < todos.length; a++) {
                if (todos[a].gorevID == gelenTaskID) {
                    var selected = todos[a];
                }
            }

            IfIssetTrueId("editTaskName", function (e) {
                if (e) {
                    e.value = selected.gorevAdi;
                }
            });

            IfIssetTrueId("editTaskDesc", function (e) {
                if (e) {
                    e.value = selected.gorevAciklamasi;
                }
            });

            IfIssetTrueId("egTamamlanmasi", function (e) {
                if (e) {
                    e.value = selected.gorevTamamlanmasi;
                    IfIssetTrueId("eskiGorevTamamlanmasi", function (a) {
                        if (a) {
                            if (selected.gorevTamamlanmasi == "99") {
                                a.innerHTML = "100";
                                e.value = 20;
                            }
                            else if (selected.gorevTamamlanmasi.length < 2) {
                                a.innerHTML = (e.value * 10).toString();
                                e.value = selected.gorevTamamlanmasi * 2;
                            } else {
                                let cevirici = parseInt(selected.gorevTamamlanmasi[0]);
                                let cevirici2 = parseInt(selected.gorevTamamlanmasi[1]);
                                cevirici = cevirici * 2;
                                cevirici = cevirici + cevirici2;
                                a.innerHTML = (cevirici * 5).toString();
                                e.value = cevirici;
                            }
                        }
                    });
                }
            });

            IfIssetTrueId("eGSonTarihiB", function (e) {
                if (e) {
                    IfIssetTrueId("eGSonTarihi", function (a) {
                        if (a) {
                            if (selected.gorevSonTarihi == "0000-00-00" || (selected.gorevSonTarihi == "" || selected.gorevSonTarihi == null)) {
                                e.checked = false;
                            } else {
                                e.checked = true;
                                a.value = selected.gorevSonTarihi;
                            }
                            checkBoxIslevi();
                        }
                    });
                }
            });


            IfIssetTrueId("DeleteThisTask", function (e) {
                if (e) {
                    e.onclick = function () {
                        let newOne = []
                        for (let a = 0; a < todos.length; a++) {
                            if (todos[a].gorevID == gelenTaskID) {
                            } else {
                                newOne.push(todos[a]);
                            }
                        }
                        let todosJSON = JSON.stringify(newOne);
                        todosJSON = todosJSON.toString();
                        fs_edittask.writeFile('todos.json', todosJSON, function (err) {
                            if (!err) {
                                ipcRenderer.send("closeEditPage", "true");
                                ipcRenderer.send("taskEdited", "true");
                            }
                        });
                    }
                }
            });

            IfIssetTrueId("SaveEditedTask", function (e) {
                if (e) {
                    e.onclick = function () {
                        var changeSaver = { gorevAdi: "", gorevAciklamasi: "", gorevTamamlanmasi: "", gorevSonTarihi: "" };

                        IfIssetTrueId("editTaskName", function (e) {
                            if (e) {
                                changeSaver.gorevAdi = e.value;
                            }
                        });

                        IfIssetTrueId("editTaskDesc", function (e) {
                            if (e) {
                                changeSaver.gorevAciklamasi = e.value;
                            }
                        });

                        IfIssetTrueId("egTamamlanmasi", function (e) {
                            if (e) {
                                let cevirici;
                                cevirici = parseInt(e.value);
                                if (cevirici == 101 || (cevirici == 100 || cevirici == 20)) {
                                    changeSaver.gorevTamamlanmasi = "99";
                                } else if (cevirici % 2 == 0) {
                                    cevirici = cevirici / 2;
                                    changeSaver.gorevTamamlanmasi = cevirici.toString();
                                } else {
                                    cevirici = cevirici - 1;
                                    cevirici = cevirici / 2;
                                    changeSaver.gorevTamamlanmasi = cevirici.toString() + "1";
                                }
                            }
                        });

                        IfIssetTrueId("eGSonTarihiB", function (e) {
                            if (e) {
                                if (e.checked) {
                                    IfIssetTrueId("eGSonTarihi", function (a) {
                                        if (a) {
                                            changeSaver.gorevSonTarihi = a.value;
                                        }
                                    });
                                } else {
                                    changeSaver.gorevSonTarihi = "0000-00-00";
                                }
                            }
                        });

                        for (let a = 0; a < todos.length; a++) {
                            if (todos[a].gorevID == selected.gorevID) {
                                todos[a].gorevAdi = changeSaver.gorevAdi;
                                todos[a].gorevAciklamasi = changeSaver.gorevAciklamasi;
                                todos[a].gorevTamamlanmasi = changeSaver.gorevTamamlanmasi;
                                todos[a].gorevSonTarihi = changeSaver.gorevSonTarihi;
                            }
                        }
                        let todosJSON = JSON.stringify(todos);
                        todosJSON = todosJSON.toString();

                        fs_edittask.writeFileSync('todos.json', todosJSON);
                        ipcRenderer.send("closeEditPage", "true");
                        ipcRenderer.send("taskEdited", "true");
                    };
                }
            });
        }
    });
});