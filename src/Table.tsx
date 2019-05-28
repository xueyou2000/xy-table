import classNames from "classnames";
import React, { useRef, useState } from "react";
import { ExpanderContext, TableContext } from "./Context";
import FixedTable from './FixedTable';
import useExpander from "./Hooks/useExpander";
import { ScrollPosition, TableProps } from "./interface";
import TableMain from "./TableMain";

export const ExpandFlag = "_expand_flag";

function Table(props: TableProps) {
    const { prefixCls = "xy-table", className, style, columns, data, renderCell, renderRow, scroll = {}, emptyText, expandedRowRender, expandRowByClick, expandIconAsCell, expandIcon, expandIconColumnIndex = 0 } = props;
    const [expandedRowKeys, changeExpandHandle, getFullColumns] = useExpander(props);
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>("left");
    // const [scrollTop, setScrollTop] = useState(0);
    const classString = classNames(prefixCls, className, `${prefixCls}-scroll-position-${scrollPosition}`, {
        [`${prefixCls}-fixed-header`]: scroll && !!scroll.y
    });
    const ref = useRef(null);


    function onTableMainScroll(position: ScrollPosition, e: React.UIEvent<HTMLDivElement>) {
        if (position !== scrollPosition) {
            setScrollPosition(position);
        }
        handleBodyScroll(e);
    }

    const lastScrollTop = useRef(0);
    function handleBodyScroll(e: React.UIEvent<HTMLDivElement>) {
        const element = ref.current as HTMLElement;
        const target = e.target as HTMLElement;
        if (e.currentTarget !== target) {
            return;
        }

        const fixedColumnsBodyLeft = element.querySelector(`.${prefixCls}-fixed-left .${prefixCls}-body-inner`);
        const fixedColumnsBodyRight = element.querySelector(`.${prefixCls}-fixed-right .${prefixCls}-body-inner`);
        const bodyTable = element.querySelector(`.${prefixCls}-body`);

        if (target.scrollTop !== lastScrollTop.current && scroll.y) {
            const scrollTop = target.scrollTop;

            if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
                fixedColumnsBodyLeft.scrollTop = scrollTop;
            }
            if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
                fixedColumnsBodyRight.scrollTop = scrollTop;
            }
            if (fixedColumnsBodyRight && target !== bodyTable) {
                bodyTable.scrollTop = scrollTop;
            }
        }

        lastScrollTop.current = target.scrollTop;
    }

    function onRowHeightUpdate(_rowsHeight: number[]) {
        const element = ref.current as HTMLElement;
        const leftFixedRows = element.querySelectorAll(`.${prefixCls}-fixed-left .${prefixCls}-cell`);
        const rightFixedRows = element.querySelectorAll(`.${prefixCls}-fixed-right .${prefixCls}-cell`);

        function syncRowsHeight(rows: NodeListOf<Element>) {
            if (rows.length < 0) {
                return;
            }
            [].forEach.call(rows, (row: HTMLElement, i: number) => {
                if (i < _rowsHeight.length) {
                    row.style.height = `${_rowsHeight[i]}px`;
                }
            });
        }
        syncRowsHeight(leftFixedRows);
        syncRowsHeight(rightFixedRows);
    }

    return (
        <div className={classString} style={style}>
            <div className={`${prefixCls}-content`} ref={ref}>
                <TableContext.Provider value={{ renderCell, renderRow }}>
                    <ExpanderContext.Provider
                        value={{ expandedRowRender, expandRowByClick, showExpandIcon: !!expandedRowRender, expandIcon, getFullColumns, expandIconAsCell, expandIconColumnIndex, expandedRowKeys, onExpand: changeExpandHandle }}
                    >
                        <TableMain prefixCls={prefixCls} columns={columns} data={data} scroll={scroll} emptyText={emptyText} onScrollLeft={onTableMainScroll} onRowHeightUpdate={onRowHeightUpdate} />
                        <FixedTable prefixCls={prefixCls} columns={columns} data={data} scroll={scroll} fixed="left" />
                        <FixedTable prefixCls={prefixCls} columns={columns} data={data} scroll={scroll} fixed="right" onScroll={handleBodyScroll} />
                    </ExpanderContext.Provider>
                </TableContext.Provider>
            </div>
        </div>
    );
}

export default React.memo(Table);
