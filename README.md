# PureGISwitch
纯净的原神官服与B服互切换工具

## 使用
> [!WARNING]
> 请勿将程序放在游戏目录内，否则会导致检查资源完整性时报错，若你的游戏在“Program Files”文件夹中，请以管理员身份运行程序

### 通过Release下载使用（推荐）
单一个exe文件，方便操作
- 通过[Release](https://github.com/foxhui/PureGISwitch/releases)下载文件，并把文件放在一个空白的文件夹中
- 运行一次`PureGISwitch.exe`以释放所需依赖和配置文件
- 填写配置文件，打开`setting.ini`根据备注指引填写路径地址
- 再次运行`PureGISwitch.exe`即可使用
### 通过直接下载仓库使用
透明简洁，但文件较多
- 下载整个仓库并解压到你喜欢的地方
- 填写配置文件，打开`setting.ini`根据备注指引填写路径地址
- 直接运行`PureGISwitch.bat`即可使用

### 配置文件预览（setting.ini）
```ini
[Setting]
# 填写你YuanShen.exe所在的目录（不是启动器的，而是游戏本体）
# 可以在启动器的“开始游戏”按钮右边的三条杠中的“游戏设置/定位游戏”中看到
# 示例：genshin_path=D:\Games\miHoYo Launcher\games\Genshin Impact Game

genshin_path=

# 切换完毕后自动启动游戏，false为关闭，true为开启

auto_startup=true

# 自动启动游戏的路径，不填则默认直接启动游戏本体（即YuanShen.exe）
# 如果需要通过解锁帧工具启动游戏，请填写解锁帧工具的路径（也可以填写官方启动器的路径）
# 示例：auto_startup_path=D:\Games\UnlockFPS\unlockfps_255.exe

auto_startup_path=

```

## 声明
### 文件来源
```
GNU Win：https://sourceforge.net/projects/gnuwin32/files/sed/
└─ libiconv2.dll
└─ libintl3.dll
└─ regex2.dll
└─ winsed.exe

B服游戏包
└─ PCGameSDK.dll
```

### 免责声明
本工具原理很简单，只是简单修改`config.ini`和添加或删除`PCGameSDK.dll`，并没有对游戏进行注入修改，若您非常顾虑是否使用，请立即停止使用，使用后的后果自负，工具和工具作者不承担任何责任
