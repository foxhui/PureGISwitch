// 关闭右键菜单
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

// 读取配置文件
readConfig();

// 选择游戏目录
document.getElementById('saveFolder').addEventListener('click', function (event) {
    event.preventDefault();
    Niva.api.dialog.pickDir()
        .then((path) => {
            if (path) {
                modifyConfig("folder", path)
                    .then(() => {
                        readConfig();
                    });
            }
        });
});

// 选择游戏入口
document.getElementById('saveFile').addEventListener('click', function (event) {
    event.preventDefault();
    Niva.api.dialog.pickFile(["exe", "lnk"])
        .then((path) => {
            if (path) {
                modifyConfig("file", path)
                    .then(() => {
                        readConfig();
                    });
            }
        });
});

// 切换至官服
document.getElementById('2mi').addEventListener('click', function (event) {
    event.preventDefault();
    var folder = document.getElementById('folder').value;
    var file = document.getElementById('file').value;
    if (folder && file) {
        modifyINI(`${folder}/config.ini`, "1", "mihoyo")
            .then(() => {
                Niva.api.fs.remove(`${folder}/YuanShen_Data/Plugins/PCGameSDK.dll`)
                    .then(() => {
                        Niva.api.process.open(document.getElementById('file').value)
                            .then(() => {
                                Niva.api.process.exit();
                            });
                    })
                    .catch((error) => {
                        showError("删除SDK文件时出错:" + error);
                    });
            });
    } else {
        showError("请先选择游戏目录和游戏入口！");
    }
});

// 切换至B服
document.getElementById('2bl').addEventListener('click', function (event) {
    event.preventDefault();
    var folder = document.getElementById('folder').value;
    var file = document.getElementById('file').value;
    if (folder && file) {
        modifyINI(`${folder}/config.ini`, "14", "bilibili")
            .then(() => {
                Niva.api.resource.extract("lib/PCGameSDK.dll", `${folder}/YuanShen_Data/Plugins/PCGameSDK.dll`)
                    .then(() => {
                        Niva.api.process.open(document.getElementById('file').value)
                            .then(() => {
                                Niva.api.process.exit();
                            });
                    })
                    .catch((error) => {
                        showError("提取SDK文件时出错:" + error);
                    });
            });
    } else {
        showError("请先选择游戏目录和游戏入口！");
    }
});

// 修改INI文件
function modifyINI(filePath, newChannelValue, newCpsValue) {
    return Niva.api.fs.read(filePath, 'utf8')
        .then((content) => {
            content = content.replace(/^(channel\s*=\s*)[^=\r\n]*/gm, `$1${newChannelValue}`);
            content = content.replace(/^(cps\s*=\s*)[^=\r\n]*/gm, `$1${newCpsValue}`);
            return Niva.api.fs.write(filePath, content, 'utf8');
        })
        .then(() => {
            console.log(`游戏配置文件修改成功`);
        })
        .catch((error) => {
            showError("修改游戏配置文件时出错:" + error);
        });
}

// 读取配置文件
function readConfig() {
    return Niva.api.process.currentDir().then((folderPath) => {
        if (folderPath) {
            const jsonFilePath = `${folderPath}/PureGISwitcher.json`;
            Niva.api.fs.exists(jsonFilePath).then((exists) => {
                if (exists) {
                    Niva.api.fs.read(jsonFilePath, 'utf8').then((content) => {
                        try {
                            const jsonData = JSON.parse(content);
                            const folder = jsonData.folder || null;
                            const file = jsonData.file || null;

                            document.getElementById('folder').value = folder;
                            document.getElementById('file').value = file;
                        } catch (error) {
                            showError("读取或检查配置文件时出错:" + error);
                        }
                    }).catch((error) => {
                        showError("读取配置文件时出错:" + error);
                    });
                } else {
                    const emptyJson = JSON.stringify({ folder: null, file: null });
                    Niva.api.fs.write(jsonFilePath, emptyJson, 'utf8').then(() => {
                        console.log("创建 PureGISwitcher.json 文件成功");
                    }).catch((error) => {
                        showError("创建配置文件时出错:" + error);
                    });
                }
            }).catch((error) => {
                showError("检查配置文件是否存在时出错:" + error);
            });
        }
    });
}

// 修改配置文件
function modifyConfig(key, value) {
    return Niva.api.process.currentDir().then((folderPath) => {
        if (folderPath) {
            const jsonFilePath = `${folderPath}/PureGISwitcher.json`;
            Niva.api.fs.read(jsonFilePath, 'utf8').then((content) => {
                const jsonData = JSON.parse(content);
                jsonData[key] = value;
                const updatedContent = JSON.stringify(jsonData, null, 2);
                Niva.api.fs.write(jsonFilePath, updatedContent, 'utf8');
            }).catch((error) => {
                showError("修改配置文件时出错:" + error);
            });
        }
    });
}

// 错误提示框
function showError(message) {
    Niva.api.dialog.showMessage('错误', message, 'error');
}