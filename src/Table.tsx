import classNames from "classnames";
import { TableProps, TableColumn } from "./interface";
import React from "react";
import BaseTable from "./BaseTable";
import { TableContext, ExpanderContext } from "./Context";
import { useControll } from "utils-hooks";

export const ExpandFlag = "_expand_flag";

function Table(props: TableProps) {
    const {
        prefixCls = "xy-table",
        className,
        style,
        columns,
        data,
        emptyText = "暂无数据",
        renderCell,
        renderRow,
        scroll,
        expandedRowRender,
        expandRowByClick,
        expandIconAsCell,
        expandIcon,
        expandIconColumnIndex = 0,
        onExpand,
        onExpandedRowsChange
    } = props;
    const classString = classNames(prefixCls, className, `${prefixCls}-scroll-position-left`);
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
                        <div className={`${prefixCls}-scroll`}>
                            <div className={`${prefixCls}-body`} style={{ overflowX: scroll && scroll.x ? "scroll" : null, overflowY: scroll && scroll.y ? "scroll" : null }}>
                                <BaseTable prefixCls={prefixCls} className={`${prefixCls}-fixed`} style={scroll && scroll.x ? { width: (scroll as any).x } : null} columns={columns} data={data} fixed={false} hasBody={true} hasHead={true} />
                                {(!data || data.length === 0) && <div className={`${prefixCls}-placeholder`}>{emptyText}</div>}
                            </div>
                        </div>
                    </ExpanderContext.Provider>
                </TableContext.Provider>
            </div>
        </div>
    );
}

export default React.memo(Table);
