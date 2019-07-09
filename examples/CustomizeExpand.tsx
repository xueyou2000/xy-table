import React from "react";
import Table from "../src";
import "./index.scss";
import { ExpandIconProps } from "../src/Expander/interface";
import { TableColumn } from "../src/interface";

const columns: TableColumn[] = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 100,
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: 100,
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 200,
    },
    {
        title: "Operations",
        key: "operations",
        width: 60,
        fixed: "right",
        render: () => <a href="#">Delete</a>,
    },
];

const data = [{ name: "Jack", age: 28, address: "some where", key: "1" }, { name: "Rose", age: 36, address: "some where", key: "2" }];

function CustomExpandIcon(props: ExpandIconProps) {
    let text;
    if (props.expanded) {
        text = "&#8679; collapse";
    } else {
        text = "&#8681; expand";
    }
    return <a className="expand-row-icon" onClick={props.onClick} dangerouslySetInnerHTML={{ __html: text }} style={{ color: "blue", cursor: "pointer" }} />;
}

export default function() {
    return (
        <div className="table-demo">
            <Table
                scroll={{ x: 480 }}
                expendWidth={100}
                columns={columns}
                data={data}
                expandIcon={CustomExpandIcon}
                expandIconAsCell={true}
                expandIconColumnIndex={0}
                expandedRowRender={(record, expanded) => <p>{record.address}</p>}
                expandRowByClick={true}
                onExpand={(record, expanded) => console.log("record", record, "expanded", expanded)}
            />
        </div>
    );
}
