@echo off
chcp 65001 > nul

for /f "tokens=1,* delims==" %%A in ('findstr /r "^genshin_path= ^auto_startup_path= ^auto_startup=" "%~dp0setting.ini"') do (
    if "%%A"=="genshin_path" (
        set "genshin_path=%%B"
    ) else if "%%A"=="auto_startup_path" (
        set "auto_startup_path=%%B"
    ) else if "%%A"=="auto_startup" (
        set "auto_startup=%%B"
    )
)

if not defined genshin_path (
    echo 错误：未在 setting.ini 找到 genshin_path 值或者未找到 setting.ini
    echo 提示：如果是初次运行请在 setting.ini 中填写您 YuanShen.exe 所在的目录
    pause
    exit /b 1
)

if not defined auto_startup_path (
    set "auto_startup_path=%genshin_path%\YuanShen.exe"
)

:menu
echo.
echo 请选择一个选项:
echo 1. 切换至：官服
echo 2. 切换至：B服
echo.
choice /c 12 /n /m "请输入 1 或 2: "
set choice=%errorlevel%

if %choice%==1 goto option1
if %choice%==2 goto option2

:option1
.\assets\winsed -i -c "s/channel=[0-9]*/channel=1/; s/cps=[a-zA-Z0-9]*/cps=mihoyo/; s/sub_channel=[0-9]*/sub_channel=1/" "%genshin_path%\config.ini"
if exist "%genshin_path%\YuanShen_Data\Plugins\PCGameSDK.dll" del "%genshin_path%\YuanShen_Data\Plugins\PCGameSDK.dll"
del sed*
echo 已切换至：官服
goto end

:option2
.\assets\winsed -i -c "s/channel=[0-9]*/channel=14/; s/cps=[a-zA-Z0-9]*/cps=bilibili/; s/sub_channel=[0-9]*/sub_channel=0/" "%genshin_path%\config.ini"
copy .\assets\PCGameSDK.dll "%genshin_path%\YuanShen_Data\Plugins\"
del sed*
echo 已切换至：B服
goto end

:end

if "%auto_startup%"=="true" (
    echo 正在启动游戏...
    start "" "%auto_startup_path%"
) else (
    echo 按任意键退出工具...
    pause
)



