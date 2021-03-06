import React from "react";
import Table from "../src";
import "./index.scss";

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 100
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: 100
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 200
    },
    {
        title: "Operations",
        dataIndex: "",
        key: "operations",
        render: () => <a href="#">Delete</a>
    }
];

const data = [{ name: "Jack", age: 28, address: "some where", key: "1" }, { name: "Rose", age: 36, address: "some where", key: "2" }];

export default function() {
    return (
        <div className="table-demo">
            <Table
                columns={columns}
                data={data}
                expandIconAsCell={true}
                expandIconColumnIndex={0}
                expandedRowRender={(record, expanded) => <p>{record.address}</p>}
                expandRowByClick={true}
                onExpand={(record, expanded) => console.log("record", record, "expanded", expanded)}
            />
        </div>
    );
}
