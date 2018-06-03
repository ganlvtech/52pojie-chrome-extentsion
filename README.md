# 52pojie.cn chrome extension

## 功能

* 帖子左侧目录滚动
* 帖子折叠

## 开发

### 安装依赖

```bash
npm install
npm install webpack -g
```

### 开发实时监视代码改动

```bash
npm run watch
```

`build` 文件夹下是未打包成 `crx` 的版本，用于开发，请使用 `加载已解压的扩展程序`。

### 发布版本

使用 Chrome 中的 `打包扩展程序` 之后，即可生成一个私钥，把私钥复制到项目根目录下 `key.pem`，然后执行

```bash
npm run build
```

即可在 `dist` 文件夹下生成对应版本号的 `crx` 文件。

## LICENSE

    52pojie.cn chrome extentsion
    Copyright (C) 2018  Ganlv

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
