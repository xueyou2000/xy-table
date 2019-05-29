import React, { useState, useEffect } from "react";
import { useControll } from "utils-hooks";
import { TableProps, TableColumn } from "../interface";
import { Checkbox } from "xy-checkbox";
import "xy-checkbox/assets/index.css";

export default function useSelectedRows(props: TableProps) {
    const { data = [], onChange, disabledRowIndexs } = props;
    const availableSelecteds = [];
    data.forEach((d, i) => {
        if (!disabledRowIndexs || (disabledRowIndexs && !disabledRowIndexs(d))) {
            availableSelecteds.push(i);
        }
    });

    const selectMode = "onChange" in props;
    const [selectedRowIndexs, setSelectedRowIndexs, isControll] = useControll(props, "selectedRowIndexs", "defaultSelectedRowIndexs", []);
    const [indeterminate, setIndeterminate] = useState(selectedRowIndexs.length !== availableSelecteds.length && selectedRowIndexs.length !== 0);
    const [checkedAll, setCheckedAll] = useState(selectedRowIndexs.length === availableSelecteds.length);

    useEffect(() => {
        // 数据改变了, 则复选框清空
        setIndeterminate(false);
        setCheckedAll(false);
        changeSelectedRowIndexs([]);
    }, [data]);

    function changeSelectedRowIndexs(indexs: number[]) {
        if (!isControll) {
            setSelectedRowIndexs(indexs);
        }
        const checkAll = indexs.length === availableSelecteds.length;
        if (indexs.length === 0 || checkAll) {
            setIndeterminate(false);
            setCheckedAll(checkAll);
        } else {
            setIndeterminate(true);
            setCheckedAll(true);
        }

        if (onChange) {
            onChange(data.filter((x, i) => indexs.some((index) => index === i)), indexs);
        }
    }

    function onSwitchSelectedRow(checked: boolean, val: number) {
        const index = selectedRowIndexs.findIndex((x) => x === val);
        if (index === -1) {
            // 选中
            changeSelectedRowIndexs([...selectedRowIndexs, val]);
        } else {
            // 取消选中
            changeSelectedRowIndexs(selectedRowIndexs.filter((x) => x !== val));
        }
    }

    function onToggleCheckedAll(_checkedAll: boolean) {
        if (_checkedAll) {
            changeSelectedRowIndexs(availableSelecteds);
        } else {
            changeSelectedRowIndexs([]);
        }
        setCheckedAll(_checkedAll);
        setIndeterminate(false);
    }

    function getCheckboxColumn(columns: TableColumn[]) {
        if (!selectMode) {
            return columns;
        }
        const checkboxColumn: TableColumn = {
            key: "checkbox",
            title: <Checkbox disabled={data.length === 0} checked={checkedAll && data.length !== 0} indeterminate={indeterminate} onChange={onToggleCheckedAll} />,
            width: 60,
            fixed: columns.length > 1 ? columns[0].fixed : false,
            render: (record: any, rowIndex: number) => {
                return <Checkbox value={rowIndex} disabled={!availableSelecteds.some((x) => x === rowIndex)} checked={selectedRowIndexs.some((x) => x === rowIndex)} onChange={onSwitchSelectedRow} />;
            }
        };
        return [checkboxColumn, ...columns];
    }

    return getCheckboxColumn;
}
