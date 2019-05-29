import React, { useState, useRef } from "react";
import Table from "../src";
import "./index.scss";
import { TableColumn } from "../src/interface";

const data = [
    { a: "123", b: "xxxxxxxx", d: 3, key: "1", title: "hello" },
    { a: "cdd", b: "edd12221", d: 3, key: "2", title: "hello" },
    { a: "133", c: "edd12221", d: 2, key: "3", title: "hello" },
    { a: "133", c: "edd12221", d: 2, key: "4", title: "hello" },
    { a: "133", c: "edd12221", d: 2, key: "5", title: "hello" },
    { a: "133", c: "edd12221", d: 2, key: "6", title: "hello" },
    { a: "133", c: "edd12221", d: 2, key: "7", title: "hello" },
    { a: "133", c: "edd12221", d: 2, key: "8", title: "hello" },
    { a: "133", c: "edd12221", d: 2, key: "9", title: "hello" }
];
export default function() {
    const columns: TableColumn[] = [
        { title: "title1", dataIndex: "a", key: "a" },
        { title: "title2", dataIndex: "b", key: "b", width: 200, render: (record) => <span>自定义内容: {record.a}</span> },
        { title: "title3", dataIndex: "c", key: "c" },
        { title: "title4", dataIndex: "b", key: "d" },
        { title: "title5", dataIndex: "b", key: "e" },
        { title: "title7", dataIndex: "b", key: "g" }
    ];

    return (
        <div className="table-demo">
            <Table columns={columns} data={data} />
        </div>
    );
}
