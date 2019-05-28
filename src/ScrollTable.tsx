import React, { useRef } from "react";
import BaseTable from "./BaseTable";
import { ScrollTableProps } from "./interface";

function ScrollTable(props: ScrollTableProps) {
    const { prefixCls, columns, data, emptyText = "暂无数据", scroll } = props;
    const headerRef = useRef(null);
    const bodyRef = useRef(null);

    const bodyStyle: React.CSSProperties = {};
    const bodyTableStyle: React.CSSProperties = {};
    if (scroll && scroll.x) {
        bodyStyle.overflowX = "scroll";
        if (typeof scroll.x === "string" || typeof scroll.x === "number") {
            bodyTableStyle.width = scroll.x;
            // 自定义悬浮表头加上滚动条的距离，防止表格内容滚动，表格头部最后一点不协调
            // bodyTableStyle.paddingRight = 17 * 2 + "px";
        }
    }
    if (scroll && scroll.y) {
        bodyStyle.overflowY = "scroll";
        if (typeof scroll.y === "string" || typeof scroll.y === "number") {
            bodyStyle.maxHeight = scroll.y;
        }
    }

    function onScroll(e: React.UIEvent<HTMLDivElement>) {
        const body = e.target as HTMLElement;
        const head = headerRef.current as HTMLElement;
        if (head) {
            head.scrollLeft = body.scrollLeft;
        }
    }

    return (
        <div className={`${prefixCls}-scroll`}>
            {scroll && !!scroll.y && (
                <div className={`${prefixCls}-header`} ref={headerRef}>
                    <BaseTable prefixCls={prefixCls} className={`${prefixCls}-fixed`} style={bodyTableStyle} columns={columns} data={data} fixed={false} hasBody={false} hasHead={true} />
                </div>
            )}
            <div className={`${prefixCls}-body`} style={bodyStyle} ref={bodyRef} onScroll={onScroll}>
                <BaseTable prefixCls={prefixCls} className={`${prefixCls}-fixed`} style={bodyTableStyle} columns={columns} data={data} fixed={false} hasBody={true} hasHead={!scroll || !scroll.y} />
                {(!data || data.length === 0) && <div className={`${prefixCls}-placeholder`}>{emptyText}</div>}
            </div>
        </div>
    );
}

export default React.memo(ScrollTable);
