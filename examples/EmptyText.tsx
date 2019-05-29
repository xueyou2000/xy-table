import React, { useState, useRef } from "react";
import Table from "../src";
import "./index.scss";
import { TableColumn } from "../src/interface";

export default function() {
    const columns: TableColumn[] = [
        { title: "title1", dataIndex: "a", key: "a" },
        { title: "title2", dataIndex: "b", key: "b" },
        { title: "title3", dataIndex: "c", key: "c" },
        { title: "title4", dataIndex: "b", key: "d" },
        { title: "title5", dataIndex: "b", key: "e" }
    ];

    return (
        <div className="table-demo">
            <Table columns={columns} data={[]} />
        </div>
    );
}
