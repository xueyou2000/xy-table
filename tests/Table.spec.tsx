import React from "react";
import { render } from "@testing-library/react";
import Table from "../src";

const columns = [
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
        dataIndex: "",
        key: "operations",
        render: () => <a href="#">Delete</a>,
    },
];

const data = [{ name: "Jack", age: 28, address: "some where", key: "1" }, { name: "Rose", age: 36, address: "some where", key: "2" }];

describe("Table", () => {
    test("empty status", () => {
        const wrapper = render(<Table columns={columns} data={[]} emptyText="没有数据" />);
        expect(wrapper.getByText("没有数据").classList.contains("xy-table-placeholder")).toBeTruthy();
    });

    test("text align", () => {
        const wrapper = render(<Table columns={columns} data={data} align="right" />);
        const table = wrapper.container.querySelector(".xy-table");
        expect(table.classList.contains("xy-table-align-right")).toBeTruthy();
        const oneCell = wrapper.container.querySelector(".xy-table-row:first-child td") as HTMLInputElement;
        expect(table.classList.contains("xy-table-align-right")).toBeTruthy();
    });
});
