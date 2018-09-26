# Jarvis
综合其他项目中的文件目录架构，吸取各方所长，融入这个项目中，作为一个种子项目。

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

## Development server
开发环境：`npm start`。浏览器中打开`http://localhost:3000`。
端口配置在`package.json`中配置的，这里我为了防止和公司项目冲突，所以修改端口为3000.
## Code scaffolding
运行`ng generate component component-name`可以创建新的组件。当然也可以创建其他类型的文件：`ng generate directive|pipe|service|class|guard|interface|enum|module`。
当然也可以使用简写版本：`ng g c componet-name`。其他同理。
## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
## 目录介绍
目录一览：
- app 应用目录
  - core 核心功能目录
      - service 所有服务文件夹
      - interface 所有接口文件夹
      - pipe 所有管道文件夹
      - enum 所有枚举类型文件夹
  - modal 所有弹窗文件夹
  - pages 所有页面文件夹
    - common 公共页面文件夹
    - components 所有业务组件，按照业务模块分层
    - layout 所有母版文件


### core目录
项目核心功能目录，包括：
- api 管理所有api的设置，包括htt请求和拦截器

### api目录
管理所有的api设置，这里有公共api、api服务、http拦截器。

公共的api里面放通用请求，比如登录、退出登录之类的。其他的模块内部请求写在模块内部的文件夹里面。