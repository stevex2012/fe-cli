# 学习笔记
### pakcage.json
  - privat： ture 私有目录，不会发布
  
### 大型前端代码项目管理方式
  - multirupo 每个包对应一个项目
  - monorepo 一个项目仓库中管理多个包/模块
    - 优点：一套脚手架管理多个package
    - 缺点：repo体积较大，个个package都是独立的，需要维护自己的dependencies，可能出现相同依赖，重复安装

### yarn workspace
 - 允许我们用monorop的形式来管理项目
 - 在安装node_modules的时候不会安装到每个子项目的 node_modules 里main，而是直接安装到根目录项目，这个每个子项目可以读取到根目录的node_modules
 - 整个项目只有跟目录一份yarn.lock文件，子项目也会被link到node_modules里面，这样我们就可以允许我们直接import倒入对应的子项目
 - yarn.lock 文件也是自动生成的，完全Yarn来处理，yarn.lock锁定你安装的每个以来项的版本呢，这样可以确保你不会意外获取不良的依赖
开启yarn工作区(项目根目录的package.json)
```json
{
  "private": true,
  "workspace": [
    "packages/*"
  ]
}
```
### yarn 
 - 速度快
 - 支持workspace

yarn install 作用
  - 安装lerna和他的依赖
  - 在根目录的node_modules里面创建软链接，链向哥哥packages中的个个包
  
yarn workspace vs lerna
yarn 重点包管理，处理依赖，处理软链
yarn install = lerna bootstrap
lerna 重点在于多个项目管理和发布



## storybook 用户独立开发react，vue，angular的ui组件

## npm whoami 查看登录状况

### 软连接(快捷方式？)


### 硬连接
