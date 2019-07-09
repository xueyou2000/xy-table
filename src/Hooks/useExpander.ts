import React, { useState } from "react";
import { useControll } from "utils-hooks";
import { TableProps, TableColumn } from "../interface";
import { ExpandFlag } from "../Table";

/**
 * 管理折叠功能
 * @param props
 */
export default function useExpander(props: TableProps): [number[], (key: number, expanded: boolean) => void, (baseColumns: TableColumn[]) => TableColumn[]] {
    const { onExpandedRowsChange, onExpand, data, expendWidth = null, expandIconAsCell = false, expandedRowRender, expandIconColumnIndex = 0 } = props;

    const [expandedRowKeys, setExpandedRowKeys, isControll] = useControll<number[]>(props, "expandedRowKeys", "defaultExpandAllRows", []);

    function changeExpandedRowKeys(keys: number[]) {
        if (!isControll) {
            setExpandedRowKeys(keys);
        }
        if (onExpandedRowsChange) {
            onExpandedRowsChange(keys);
        }
    }

    function changeExpandHandle(key: number, expanded: boolean) {
        const i = expandedRowKeys.findIndex((x) => x === key);
        if (expanded) {
            if (i === -1) {
                changeExpandedRowKeys([...expandedRowKeys, key]);
            }
        } else {
            if (i !== -1) {
                changeExpandedRowKeys(expandedRowKeys.filter((x) => x !== key));
            }
        }
        if (onExpand) {
            onExpand(data[key], expanded);
        }
    }

    function getFullColumns(baseColumns: TableColumn[]) {
        if (expandIconAsCell && !!expandedRowRender) {
            const cloneColumns = [...baseColumns];
            cloneColumns.splice(expandIconColumnIndex, 0, { title: ExpandFlag, width: expendWidth });
            return cloneColumns;
        } else {
            return baseColumns;
        }
    }

    return [expandedRowKeys, changeExpandHandle, getFullColumns];
}
