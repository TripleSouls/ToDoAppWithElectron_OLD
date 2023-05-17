const fs_newtask = require('fs');

radiusCheck();

ipcRenderer.on("set:changeTheme", (e, _themeMod) => {
    if (_themeMod == "Dark" || _themeMod == "dark") {
        _themeMod = 1;
    }
    _themeMod = parseInt(_themeMod);
    ChangesApply(_themeMod);
});



document.addEventListener('DOMContentLoaded', (event) => {
    IfIssetTrueId("AddThisTask", function (e) {
        if (e) {
            e.onclick = function () {
                let task = { taskName: "-", taskDesc: "--", taskProc: "0", taskDate: "0000-00-00" }
                IfIssetTrueId("AddableTaskName", function (_a) {
                    if (_a) {
                        task.taskName = _a.value;
                        IfIssetTrueId("AddableTaskDesc", function (_b) {
                            if (_b) {
                                task.taskDesc = _b.value;
                                IfIssetTrueId("gTamamlanmasi", function (_c) {
                                    if (_c) {
                                        task.taskProc = _c.value;
                                        IfIssetTrueId("gSonTarihiB", function (_d) {
                                            if (_d) {
                                                if (_d.checked == true) {
                                                    IfIssetTrueId("gSonTarihi", function (_e) {
                                                        if (_e) {
                                                            if (_d.checked == true) {
                                                                if (_e.value == "" || _e.value == null) {
                                                                    task.taskDate = "0000-00-00";
                                                                } else {
                                                                    task.taskDate = _e.value;
                                                                }
                                                            } else {
                                                                task.taskDate = "0000-00-00";
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

                if (task.taskName == "") {
                    IfIssetTrueId("AddableTaskName", function (_a) {
                        _a.classList.add("gAdiKirmizi");
                        _a.placeholder = "Görev Adı Girilmelidir.";
                    });
                } else {
                    fs_newtask.readFile('todos.json', 'utf8', function (err, todosdata) {
                        if (!err) {
                            var todos = JSON.parse(todosdata);
                            let tempID = 0;
                            for (let a = 0; a < todos.length; a++) {
                                if (tempID < todos[a].gorevID) {
                                    tempID = todos[a].gorevID;
                                }
                            }
                            tempID++;
                            let cevirici;
                            cevirici = task.taskProc;
                            if (cevirici == 20) {
                                cevirici = "99";
                                task.taskProc = cevirici.toString();
                            } else if (cevirici % 2 == 0) {
                                cevirici = cevirici / 2;
                                task.taskProc = cevirici.toString();
                            } else {
                                cevirici = cevirici - 1;
                                cevirici = cevirici / 2;
                                task.taskProc = cevirici.toString() + "1";
                            }
                            let tempData = { gorevAdi: task.taskName, gorevAciklamasi: task.taskDesc, gorevTamamlanmasi: task.taskProc, gorevID: tempID, gorevSonTarihi: task.taskDate };
                            todos.push(tempData);

                            let todosJSON = JSON.stringify(todos);
                            todosJSON = todosJSON.toString();
                            fs_newtask.writeFile('todos.json', todosJSON, function (err) {
                                if (!err) {
                                    ipcRenderer.send("closeNewPage", "true");
                                    ipcRenderer.send("taskAdded", "true");
                                }
                            });
                        }
                    });
                }
            }
        }
    });
});