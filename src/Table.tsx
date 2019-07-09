import classNames from "classnames";
import React, { useRef, useState, useEffect } from "react";
import { ExpanderContext, TableContext } from "./Context";
import FixedTable from "./FixedTable";
import useExpander from "./Hooks/useExpander";
import useSelectedRows from "./Hooks/useSelectedRows";
import { ScrollPosition, TableProps } from "./interface";
import TableMain from "./TableMain";
import Empty from "xy-empty";
import "xy-empty/assets/index.css";

export const ExpandFlag = "_expand_flag";

function Table(props: TableProps) {
    const {
        prefixCls = "xy-table",
        className,
        style,
        columns = [],
        data = [],
        renderCell,
        renderRow,
        scroll = {},
        align = "left",
        emptyText = <Empty />,
        expandedRowRender,
        expandRowByClick,
        expandIconAsCell = false,
        expandIcon,
        expandIconColumnIndex = 0,
    } = props;
    const [expandedRowKeys, changeExpandHandle, getFullColumns] = useExpander(props);
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>("left");
    const [hoverRowIndex, setHoverRowIndex] = useState(null);
    const [overflow, setOVerflow] = useState(false);
    const getCheckboxColumn = useSelectedRows(props);
    const classString = classNames(prefixCls, className, `${prefixCls}-scroll-position-${scrollPosition}`, {
        [`${prefixCls}-fixed-header`]: scroll && !!scroll.y,
        [`${prefixCls}-align-${align}`]: align,
        [`${prefixCls}-overflow`]: overflow,
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

    function syncRowsHeight(rows: NodeListOf<Element>, height: number) {
        if (rows.length < 0) {
            return;
        }
        [].forEach.call(rows, (row: HTMLElement, i: number) => {
            row.style.height = `${height[i]}px`;
        });
    }

    function syncRowsHeights(rows: NodeListOf<Element>, heights: number[]) {
        if (rows.length < 0) {
            return;
        }
        [].forEach.call(rows, (row: HTMLElement, i: number) => {
            if (i < heights.length) {
                row.style.height = `${heights[i]}px`;
            }
        });
    }

    function onRowHeightUpdate(rowsHeight: number[]) {
        const element = ref.current as HTMLElement;

        // 同步 header th 高度
        const leftFixedHeaderRows = element.querySelectorAll(`.${prefixCls}-fixed-left thead th`);
        const rightFixedHeaderRows = element.querySelectorAll(`.${prefixCls}-fixed-right thead th`);
        const bodyHeader = element.querySelector(`.${prefixCls}-body thead`) as HTMLElement;
        if (bodyHeader) {
            syncRowsHeight(leftFixedHeaderRows, bodyHeader.offsetHeight);
            syncRowsHeight(rightFixedHeaderRows, bodyHeader.offsetHeight);
        }

        // 同步 body td 高度
        const leftFixedRows = element.querySelectorAll(`.${prefixCls}-fixed-left .${prefixCls}-row`);
        const rightFixedRows = element.querySelectorAll(`.${prefixCls}-fixed-right .${prefixCls}-row`);
        syncRowsHeights(leftFixedRows, rowsHeight);
        syncRowsHeights(rightFixedRows, rowsHeight);
    }

    function setRowIndex(i: number) {
        if (hoverRowIndex !== i) {
            setHoverRowIndex(i);
        }
    }

    useEffect(() => {
        const element = ref.current as HTMLElement;
        if (element) {
            const body = element.querySelector(`.${prefixCls}-body`);
            if (body && body.clientWidth >= body.scrollWidth) {
                setOVerflow(false);
            } else {
                setOVerflow(true);
            }
        }
    }, [ref.current]);

    return (
        <div className={classString} style={style}>
            <div className={`${prefixCls}-content`} ref={ref}>
                <TableContext.Provider value={{ renderCell, renderRow, align, hoverRowIndex, setRowIndex, getCheckboxColumn }}>
                    <ExpanderContext.Provider
                        value={{ expandedRowRender, expandRowByClick, showExpandIcon: !!expandedRowRender, expandIcon, getFullColumns, expandIconAsCell, expandIconColumnIndex, expandedRowKeys, onExpand: changeExpandHandle }}
                    >
                        <TableMain prefixCls={prefixCls} columns={columns} data={data} scroll={scroll} emptyText={emptyText} onScrollLeft={onTableMainScroll} onRowHeightUpdate={onRowHeightUpdate} />
                        <FixedTable prefixCls={prefixCls} columns={columns} data={data} scroll={scroll} emptyText={emptyText} fixed="left" />
                        <FixedTable prefixCls={prefixCls} columns={columns} data={data} scroll={scroll} emptyText={emptyText} fixed="right" onScroll={handleBodyScroll} />
                    </ExpanderContext.Provider>
                </TableContext.Provider>
            </div>
        </div>
    );
}

export default React.memo(Table);
