# i 电科迎新

![i电科迎新](https://gitee.com/TXisfine/tcb-hackthon-welcomeSchool/raw/master/demo/showTime.jpg)

## 项目介绍

i 电科迎新是一款基于 Tencent Cloud Base 的高校迎新小程序。本小程序以北京电子科技职业学院的迎新工作为模型进行开发，集合了学生注册流程提示、学校介绍、校园导览、预约接站、预约住宿、电子校园卡、新生数据采集、迎新大数据（管理员）等功能。

## 项目结构

    |-- cloudfunctions                  云函数
    |   |-- buildUserTest               创建测试用户
    |   |-- checkRegister               获取报道状态
    |   |-- getAccommodation            获取预约住宿状态
    |   |-- getBigData                  获取迎新大数据统计
    |   |-- getReceivingStation         获取预约接站状态
    |   |-- getScene                    按分类获取学校地图场景
    |   |-- getSceneDetail              按ID获取标记点描述信息
    |   |-- getSceneType                获取场景分类
    |   |-- getUserInfo                 获取用户信息
    |   |-- getWeather                  获取天气（PHP）
    |   |-- login                       登录与账号绑定
    |   |-- register                    新生报道
    |   |-- setAccommodation            预约住宿
    |   |-- setReceivingStation         预约接站
    |   `-- setUserInfo                 修改用户信息
    |-- images                          图片素材
    |-- demo                            运行截图
    |-- db                              示例数据库文件
    `-- miniprogram                     小程序工程文件
        |-- colorui                     ColorUI样式库
        |-- images                      小程序图片文件
        |-- pages                       小程序页面
            |-- accommodation           预约住宿页面
            |-- bigData                 迎新大数据页面
            |-- checkin
            |   |-- checkin             扫码报道页面
            |   `-- success             报道成功页面
            |-- guide                   校园导览页面
            |-- home
            |   |-- about               关于页面
            |   |-- card                电子一卡通页面
            |   |-- index               “我的”页面
            |   `-- modifyInfo          信息维护页面
            |-- index                   首页
            |-- login                   登录页面
            |-- process                 注册流程
            |-- receivingStation        预约接站页面
            |-- schoolSurvey            学校介绍页面
            `-- splash                  splash
        |-- template                    页面模板
        `-- utils                       工具类

## 功能清单

小程序的功能是受到权限控制的，不同身份权限对应不同的功能。

- 注册流程
- 学校介绍
- 校园导览
- 关于
- 意见反馈
- 预约接站
- 预约住宿
- 扫码报道
- 信息维护
- 电子校园卡
- 迎新大数据

## 更新日志

[commits](https://gitee.com/TXisfine/tcb-hackthon-welcomeSchool/commits/master)

## 后续计划

下一步计划开发 i 电科迎新管理平台，预计包含下列功能：

- 学生信息导入\导出
- 报道统计导出
- 预约接站统计导出
- 注册流程维护
- 轮播主图维护

同时我还会继续完善项目文档。

## 项目演示

运行演示截图见 [demo](https://gitee.com/TXisfine/tcb-hackthon-welcomeSchool/tree/master/demo) 文件夹。

## 分支说明

- master 为稳定版本分支
- develop 为开发版本分支

建议部署稳定版本分支用于生产环境。

## 快速启动

通过此部分，您将快速部署一个 i 电科迎新小程序，仅作示例使用，不建议直接用于生产环境。

### 1.注册微信小程序

[注册微信小程序](https://mp.weixin.qq.com/)，获取 APPID。

### 2.下载代码

```bash
$ git clone -b master https://gitee.com/TXisfine/tcb-hackthon-welcomeSchool.git
```

### 3.导入微信开发者工具

导入项目，填入 APPID。

### 4.创建云开发环境

创建云开发环境，获取环境 ID（envID）并替换小程序 app.js 中 wx.cloud.init 中 env 的值，即将 envID 填写至项目根目录下 miniprogram 文件夹 app.js 文件注释标记为“此处填写 envID”的位置中。

### 5.导入小程序依赖静态文件

将项目根目录下 images 文件夹按结构上传到云开发的存储中，获取到一个存储域名，使用微信开发者工具的替换功能，将`https://7765-wel-5kx7f-1301750085.tcb.qcloud.la`替换为你自己的域名。

### 6.导入数据库

同样对示例数据库进行处理，替换域名并导入示例数据，将项目根目录下 db 文件夹中的 4 个 json 文件导入云开发数据库，集合名称与文件名保持一致即可。

### 7.注册和风天气 API

小程序的显示归属地天气由【和风天气】提供，请先登录[和风天气](https://dev.heweather.com/docs/api/)官网，注册用户申请 APIKEY，并填入根目录 cloudfunctions 下 getWeather 的 index.php 中 getNowWea KEY 位置中。

### 8.部署云函数

为云函数选择环境，并将项目根目录下 cloudfunctions 中除了【buildUserTest】以外的函数部署到线上中，注意：getWheather 云函数需要 PHP7.0 的环境支持。

### 9.Enjoy

### 测试账号

- 管理员：100000
- 学生：1080
- 密码均为 123456

## 移植

通过直接替换素材可直接移植。

## 作者信息

小谈谈 BH1XAQ，邮箱：tocker#16iot.cn（#=>@）

## 如何贡献代码

目前本项目采用 Git 进行版本控制，如果您想为本项目贡献代码，请【Fork】一份代码到您的仓库，修改后提交，并向我发起【Pull Request】申请，我会对您的申请和代码进行 CodeReview，若您的代码符合要求，将会被【Merge】进我的仓库中，同时您的名字也会出现在贡献者名单中。

**希望您贡献代码可以符合：**

- 含有适当注释，能够让他人读懂
- 遵循 MIT License

## 如何提交 Issues

欢迎您为本项目提交包括不限于 Bug、功能需求类的 Issues，但希望您在提交 Issues 时能够符合：

- Bug 类
  - 提供出错机型或现象
  - 若二次开发可提供报错信息
- 功能需求
  - 需求描述
  - 需求应用场景

不符合要求的 Issues 可能会被关闭。

## 依赖的开源项目

- [ColorUI](https://github.com/weilanwl/ColorUI)
- [wxbarcode](https://github.com/alsey/wxbarcode)
- [wx-charts](https://github.com/xiaolin3303/wx-charts)

在此对这些开源项目的作者表示衷心的感谢。

## 外部 API 引用

- [和风天气](https://dev.heweather.com/docs/api/)

## 开源许可证

[MIT License](https://opensource.org/licenses/MIT)
