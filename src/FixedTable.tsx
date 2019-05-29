import React, { useContext } from "react";
import BaseTable from "./BaseTable";
import { TableContext } from "./Context";
import { FixedTableProps, TableColumn } from "./interface";
import GenericTable from "./GenericTable";

function FixedTable(props: FixedTableProps) {
    const { prefixCls, data, scroll, fixed, onScroll, emptyText } = props;
    const context = useContext(TableContext);
    const columns = fixed === "left" ? context.getCheckboxColumn(props.columns) : props.columns;
    const bodyStyle: React.CSSProperties = {};
    const bodyOuterStyle: React.CSSProperties = {};
    if (scroll && scroll.x) {
        bodyStyle.overflowX = "scroll";
        bodyOuterStyle.marginBottom = "-17px";
        bodyOuterStyle.paddingBottom = "0px";
    }
    if (scroll && scroll.y) {
        bodyStyle.overflowY = "scroll";
        if (typeof scroll.y === "string" || typeof scroll.y === "number") {
            bodyStyle.maxHeight = scroll.y;
        }
    }

    const fixedColumns: TableColumn[] = [];
    let isBreak = false;
    for (let i = columns.findIndex((x) => x.fixed === fixed); i < columns.length; ++i) {
        const col = columns[i];
        if (!isBreak && col.fixed === fixed) {
            fixedColumns.push(col);
        } else {
            isBreak = true;
        }
    }

    if (fixedColumns.length === 0) {
        return null;
    }

    return (
        <GenericTable
            prefixCls={prefixCls}
            className={`${prefixCls}-fixed-${fixed}`}
            fixed={fixed}
            columns={fixedColumns}
            scroll={scroll}
            data={data}
            emptyText={emptyText}
            renderTableBody={(bodyTable) => (
                <div className={`${prefixCls}-body-outer`} style={bodyOuterStyle}>
                    <div className={`${prefixCls}-body-inner`} style={bodyStyle} onScroll={onScroll}>
                        {bodyTable}
                    </div>
                </div>
            )}
        />
    );

    // return (
    //     <div className={`${prefixCls}-fixed-${fixed}`}>
    //         {scroll && !!scroll.y && (
    //             <div className={`${prefixCls}-header`}>
    //                 <BaseTable prefixCls={prefixCls} className={`${prefixCls}-fixed`} columns={fixedColumns} data={data} fixed={fixed} hasBody={false} hasHead={true} />
    //             </div>
    //         )}
    //         <div className={`${prefixCls}-body-outer`} style={bodyOuterStyle}>
    //             <div className={`${prefixCls}-body-inner`} style={bodyStyle} onScroll={onScroll}>
    //                 <BaseTable prefixCls={prefixCls} className={`${prefixCls}-fixed`} columns={fixedColumns} data={data} fixed={fixed} hasBody={true} hasHead={!scroll || !scroll.y} />
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default React.memo(FixedTable);
