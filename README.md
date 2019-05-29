| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-table.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-table.svg?style=flat-square)

[![xy-table](https://nodei.co/npm/xy-table.png)](https://npmjs.org/package/xy-table)

# xy-table

表格组件

## 特性

-   [x] 支持表格列固定悬浮， 最好配合`scroll`属性,设置表格宽度，并且浮动的列必须指定`width`宽度
-   [x] 设置横向/纵向滚动条
-   [x] 复选框模式
-   [x] 支持扩展内容, 显示折叠图标，点击后展开扩展内容

## 安装

```bash
# yarn
yarn add xy-table
```

## 使用例子

```tsx
import React from "react";
import ReactDOM from "react-dom";
import Table from "xy-table";
import "xy-table/assets/index.css";

const columns: TableColumn[] = [{ title: "姓名", dataIndex: "name" }, { title: "年龄", dataIndex: "age" }, { title: "操作", render: (record) => <a>更新</a> }];

ReactDOM.render(<Table columns={columns} data={[{ name: "Rose", age: 99 }]} />, container);
```

## API

| 属性                     | 说明                                           | 类型                                                           | 默认值     |
| ------------------------ | ---------------------------------------------- | -------------------------------------------------------------- | ---------- |
| columns                  | 列配置                                         | TableColumn[]                                                  | []         |
| data                     | 要呈现的数据                                   | any[]                                                          | []         |
| scroll                   | 表格是否可以在 x/y 方向滚动                    | { x: (number, boolean, string), y: (number, boolean, string) } | {}         |
| emptyText                | 空内容时的占位符                               | React.ReactNode                                                | "暂无数据" |
| align                    | 文本对齐方式，可选值为 `left` `right` 或者不设 | string                                                         | `left`     |
| renderCell               | 自定义渲染列                                   | (props: TableCellProps) => JSX.Element                         | -          |
| renderRow                | 自定义渲染行                                   | (props: TableCellProps) => JSX.Element                         | -          |
| selectedRowIndexs        | 复选框选择行                                   | number[]                                                       | []         |
| defaultSelectedRowIndexs | 默认复选框选择行                               | number[]                                                       | []         |
| disabledRowIndexs        | 禁用选择行, 返回 true 则禁用此行，不能选择     | (recode: any) => boolean                                       | -          |
| onChange                 | 复选框选择事件                                 | (selectRecods: any[], selectedRowIndexs: number[]) => void     | -          |
| expandIcon               | 自定义折叠图标                                 | (props: ExpandIconProps) => JSX.Element                        | -          |
| expandRowByClick         | 是否点击行,切换扩展内容的显示/隐藏             | boolean                                                        | `false`    |
| expandIconAsCell         | 扩展图标是否作为单独的列                       | boolean                                                        | `false`    |
| expandedRowRender        | 渲染扩展行内容                                 | (record: any, expanded: boolean) => React.ReactNode            | -          |
| expandIconColumnIndex    | 扩展图标列索引, 指定将扩展图标插入到哪一列     | number                                                         | 0          |
| onExpand                 | 展开/折叠事件                                  | (record: any, expanded: boolean) => void                       | -          |
| expandedRowKeys          | 当前展开的扩展内容,这里的 key 与 行索引匹配    | number[]                                                       | -          |
| defaultExpandAllRows     | 默认展开的扩展内容                             | number[]                                                       | -          |
| onExpandedRowsChange     | 展开的扩展内容改变                             | (rows: number[]) => void                                       | -          |

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-table is released under the MIT license.
