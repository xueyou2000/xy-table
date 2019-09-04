import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Table from "../src";
import { ExpandIconProps } from "../src/Expander/interface";

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

describe("Expander", () => {
    test("show expand icon", () => {
        const wrapper = render(
            <Table
                columns={columns}
                data={data}
                expandedRowRender={(record) => (
                    <p>
                        {record.name}今年{record.age}岁
                    </p>
                )}
            />,
        );
        const expandIcon = wrapper.container.querySelector(".xy-table-expand-icon");
        expect(expandIcon.classList.contains("xy-table-collapsed")).toBeTruthy();
        const tr = wrapper.getByText("Jack今年28岁").parentElement.parentElement as HTMLElement;
        expect(tr.style.display).toBe("none");

        const expandsDetail = wrapper.container.querySelectorAll(".xy-table-expand-row");
        expect([].map.call(expandsDetail, (x: HTMLElement) => x.textContent)).toEqual(["Jack今年28岁", "Rose今年36岁"]);

        fireEvent.click(expandIcon);
        expect(expandIcon.classList.contains("xy-table-expanded")).toBeTruthy();

        expect(tr.style.display).not.toBe("none");
    });

    test("click row toggle", () => {
        const wrapper = render(
            <Table
                columns={columns}
                data={data}
                expandRowByClick={true}
                expandedRowRender={(record) => (
                    <p>
                        {record.name}今年{record.age}岁
                    </p>
                )}
            />,
        );

        const tr = wrapper.getByText("Jack今年28岁").parentElement.parentElement as HTMLElement;
        expect(tr.style.display).toBe("none");
        fireEvent.click(wrapper.container.querySelector(".xy-table-row"));
        expect(tr.style.display).not.toBe("none");
    });

    test("onExpand", () => {
        const fn = jest.fn();
        const wrapper = render(
            <Table
                columns={columns}
                data={data}
                onExpand={fn}
                expandedRowRender={(record) => (
                    <p>
                        {record.name}今年{record.age}岁
                    </p>
                )}
            />,
        );
        const expandIcon = wrapper.container.querySelector(".xy-table-expand-icon");
        fireEvent.click(expandIcon);
        expect(fn.mock.calls.length).toBe(1);
        expect(fn.mock.calls[0][0]).toEqual({ name: "Jack", age: 28, address: "some where", key: "1" });
        expect(fn.mock.calls[0][1]).toBe(true);

        fireEvent.click(expandIcon);
        expect(fn.mock.calls.length).toBe(2);
        expect(fn.mock.calls[1][0]).toEqual({ name: "Jack", age: 28, address: "some where", key: "1" });
        expect(fn.mock.calls[1][1]).toBe(false);

        fireEvent.click(wrapper.container.querySelectorAll(".xy-table-expand-icon")[1]);
        expect(fn.mock.calls.length).toBe(3);
        expect(fn.mock.calls[2][0]).toEqual({ name: "Rose", age: 36, address: "some where", key: "2" });
        expect(fn.mock.calls[2][1]).toBe(true);
    });

    test("expand icon as cell", () => {
        const wrapper = render(
            <Table
                columns={columns}
                data={data}
                expandIconAsCell={true}
                expandedRowRender={(record) => (
                    <p>
                        {record.name}今年{record.age}岁
                    </p>
                )}
            />,
        );

        const expandIcon = wrapper.container.querySelector(".xy-table-expand-icon");
        expect(expandIcon.parentElement.classList.contains("xy-table-expand-icon-cell")).toBeTruthy();
    });

    test("expand icon column index", () => {
        const wrapper = render(
            <Table
                columns={columns}
                data={data}
                expandIconColumnIndex={2}
                expandedRowRender={(record) => (
                    <p>
                        {record.name}今年{record.age}岁
                    </p>
                )}
            />,
        );

        const cell = wrapper.container.querySelector(".xy-table-cell:nth-child(3)");
        const expandIcon = wrapper.container.querySelector(".xy-table-expand-icon");

        expect(expandIcon.parentElement).toBe(cell);
    });

    test("customize expand icon", () => {
        function CustomExpandIcon(props: ExpandIconProps) {
            let text;
            if (props.expanded) {
                text = "collapse";
            } else {
                text = "expand";
            }
            return (
                <a className="expand-row-icon" onClick={props.onClick}>
                    {text}
                </a>
            );
        }

        const wrapper = render(
            <Table
                columns={columns}
                data={data}
                expandIcon={CustomExpandIcon}
                expandedRowRender={(record) => (
                    <p>
                        {record.name}今年{record.age}岁
                    </p>
                )}
            />,
        );

        const expandIcon = wrapper.container.querySelector(".expand-row-icon");
        expect(expandIcon.textContent).toBe("expand");
        fireEvent.click(expandIcon);
        expect(expandIcon.textContent).toBe("collapse");
    });

    test("default expand keys", () => {
        const wrapper = render(
            <Table
                columns={columns}
                data={data}
                defaultExpandAllRows={[1]}
                expandedRowRender={(record) => (
                    <p>
                        {record.name}今年{record.age}岁
                    </p>
                )}
            />,
        );

        const expandsDetail = wrapper.container.querySelectorAll(".xy-table-expand-icon") as NodeListOf<HTMLElement>;

        expect(expandsDetail[0].classList.contains("xy-table-collapsed")).toBeTruthy();
        expect(expandsDetail[1].classList.contains("xy-table-expanded")).toBeTruthy();
    });
});
