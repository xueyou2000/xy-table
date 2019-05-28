import classNames from "classnames";
import { TableProps, TableColumn } from "./interface";
import React from "react";
import BaseTable from "./BaseTable";
import { TableContext, ExpanderContext } from "./Context";
import { useControll } from "utils-hooks";
import ScrollTable from "./ScrollTable";

export const ExpandFlag = "_expand_flag";

function Table(props: TableProps) {
    const {
        prefixCls = "xy-table",
        className,
        style,
        columns,
        data,
        renderCell,
        renderRow,
        scroll,
        emptyText,
        expandedRowRender,
        expandRowByClick,
        expandIconAsCell,
        expandIcon,
        expandIconColumnIndex = 0,
        onExpand,
        onExpandedRowsChange
    } = props;
    const classString = classNames(prefixCls, className, `${prefixCls}-scroll-position-left`, {
        [`${prefixCls}-fixed-header`]: scroll && !!scroll.y
    });
    const bodyStyle: React.CSSProperties = {};
    const bodyTableStyle: React.CSSProperties = {};
    if (scroll && scroll.x) {
        bodyStyle.overflowX = "scroll";
        if (typeof scroll.x === "string" || typeof scroll.x === "number") {
            bodyTableStyle.width = scroll.x;
        }
    }
    if (scroll && scroll.y) {
        bodyStyle.overflowY = "scroll";
        if (typeof scroll.y === "string" || typeof scroll.y === "number") {
            bodyStyle.maxHeight = scroll.y;
        }
    }

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
            cloneColumns.splice(expandIconColumnIndex, 0, { title: ExpandFlag });
            return cloneColumns;
        } else {
            return baseColumns;
        }
    }

    return (
        <div className={classString} style={style}>
            <div className={`${prefixCls}-content`}>
                <TableContext.Provider value={{ renderCell, renderRow }}>
                    <ExpanderContext.Provider
                        value={{ expandedRowRender, expandRowByClick, showExpandIcon: !!expandedRowRender, expandIcon, getFullColumns, expandIconAsCell, expandIconColumnIndex, expandedRowKeys, onExpand: changeExpandHandle }}
                    >
                        <ScrollTable prefixCls={prefixCls} columns={columns} data={data} scroll={scroll} emptyText={emptyText} />
                    </ExpanderContext.Provider>
                </TableContext.Provider>
            </div>
        </div>
    );
}

export default React.memo(Table);
