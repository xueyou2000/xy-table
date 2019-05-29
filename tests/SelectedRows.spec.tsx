import React from "react";
import { render, fireEvent } from "react-testing-library";
import Table from "../src";

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

describe("SelectedRows", () => {
    test("enable selected mode", () => {
        const fn = jest.fn();
        const wrapper = render(<Table columns={columns} data={data} onChange={fn} />);

        const allCheckbox = wrapper.container.querySelector(".xy-table-thead input");

        const oneCheckbox = wrapper.container.querySelector(".xy-table-row:first-child input") as HTMLInputElement;

        fireEvent.click(oneCheckbox);

        expect(allCheckbox.parentElement.classList.contains("xy-checkbox-indeterminate")).toBeTruthy();
        expect(fn.mock.calls.length).toBe(2);
        expect(fn.mock.calls[1][0]).toEqual([{ name: "Jack", age: 28, address: "some where", key: "1" }]);
    });

    test("check all", () => {
        const fn = jest.fn();
        const wrapper = render(<Table columns={columns} data={data} onChange={fn} />);
        const allCheckbox = wrapper.container.querySelector(".xy-table-thead input");

        const aCheckbox = wrapper.container.querySelector(".xy-table-row:first-child input") as HTMLInputElement;
        const bCheckbox = wrapper.container.querySelector(".xy-table-row:nth-child(2) input") as HTMLInputElement;

        fireEvent.click(aCheckbox);
        fireEvent.click(bCheckbox);

        expect(allCheckbox.parentElement.classList.contains("xy-checkbox-indeterminate")).toBeFalsy();
        expect(allCheckbox.parentElement.classList.contains("xy-checkbox-checked")).toBeTruthy();

        expect(fn.mock.calls[2][0]).toEqual(data);
    });

    test("toggle check all", () => {
        const fn = jest.fn();
        const wrapper = render(<Table columns={columns} data={data} onChange={fn} />);
        const allCheckbox = wrapper.container.querySelector(".xy-table-thead input");

        fireEvent.click(allCheckbox);
        expect(fn.mock.calls[1][0]).toEqual(data);

        fireEvent.click(allCheckbox);
        expect(fn.mock.calls[2][0]).toEqual([]);
    });

    test("has disabled item", () => {
        const fn = jest.fn();
        const wrapper = render(<Table columns={columns} data={data} onChange={fn} disabledRowIndexs={(record) => record.name === "Rose"} />);
        const allCheckbox = wrapper.container.querySelector(".xy-table-thead input");

        fireEvent.click(allCheckbox);
        expect(fn.mock.calls[1][0]).toEqual([{ name: "Jack", age: 28, address: "some where", key: "1" }]);
    });
});
