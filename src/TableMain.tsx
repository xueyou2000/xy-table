import React, { useContext, useEffect, useRef } from "react";
import BaseTable from "./BaseTable";
import { TableContext } from "./Context";
import { ScrollPosition, TableMainProps } from "./interface";
import GenericTable from "./GenericTable";

function TableMain(props: TableMainProps) {
    const { prefixCls, data, scroll, onScrollLeft, emptyText, onRowHeightUpdate } = props;
    const context = useContext(TableContext);
    const columns = context.getCheckboxColumn(props.columns);
    const headerRef = useRef(null);
    const bodyRef = useRef(null);
    const bodyStyle: React.CSSProperties = {};
    const bodyTableStyle: React.CSSProperties = {};
    if (scroll && scroll.x) {
        bodyStyle.overflowX = "auto";
        if (typeof scroll.x === "string" || typeof scroll.x === "number") {
            bodyTableStyle.width = scroll.x;
            bodyTableStyle.tableLayout = "fixed";
        }
    }
    if (scroll && scroll.y) {
        bodyStyle.overflowY = "scroll";
        if (typeof scroll.y === "string" || typeof scroll.y === "number") {
            bodyStyle.maxHeight = scroll.y;
        }
    }

    function onScroll(e: React.UIEvent<HTMLDivElement>) {
        const body = e.currentTarget as HTMLElement;
        const head = headerRef.current as HTMLElement;
        if (head) {
            head.scrollLeft = body.scrollLeft;
        }
        let position: ScrollPosition = "middle";
        if (body.scrollLeft <= 0) {
            position = "left";
        }
        const table = body.firstChild as HTMLElement;
        if (body.scrollLeft >= table.clientWidth - body.clientWidth) {
            position = "right";
        }

        if (onScrollLeft) {
            onScrollLeft(position, e);
        }
    }

    useEffect(() => {
        const bodyTable = bodyRef.current as HTMLElement;
        if (bodyTable) {
            const trs = bodyTable.querySelectorAll(`tr.${prefixCls}-row`);
            const heights = [].map.call(trs, (tr: HTMLElement) => tr.offsetHeight);
            if (onRowHeightUpdate) {
                onRowHeightUpdate(heights);
            }
        }
    }, [data]);

    return (
        <GenericTable
            prefixCls={prefixCls}
            className={`${prefixCls}-scroll`}
            headerRef={headerRef}
            bodyTableStyle={bodyTableStyle}
            fixed={false}
            columns={columns}
            scroll={scroll}
            data={data}
            emptyText={emptyText}
            renderTableBody={(bodyTable) => (
                <div className={`${prefixCls}-body`} style={bodyStyle} onScroll={onScroll} ref={bodyRef}>
                    {bodyTable}
                </div>
            )}
        />
    );

    // return (
    //     <div className={`${prefixCls}-scroll`}>
    //         {scroll && !!scroll.y && (
    //             <div className={`${prefixCls}-header`} ref={headerRef}>
    //                 <BaseTable prefixCls={prefixCls} className={`${prefixCls}-fixed`} style={bodyTableStyle} columns={columns} data={data} fixed={false} hasBody={false} hasHead={true} />
    //             </div>
    //         )}
    //         <div className={`${prefixCls}-body`} style={bodyStyle} onScroll={onScroll} ref={bodyRef}>
    //             <BaseTable prefixCls={prefixCls} className={`${prefixCls}-fixed`} style={bodyTableStyle} columns={columns} data={data} fixed={false} hasBody={true} hasHead={!scroll || !scroll.y} />
    //             {(!data || data.length === 0) && <div className={`${prefixCls}-placeholder`}>{emptyText}</div>}
    //         </div>
    //     </div>
    // );
}

export default React.memo(TableMain);
