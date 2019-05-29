import React from "react";
import { GenericTableProps } from "./interface";
import BaseTable from "./BaseTable";

function GenericTable(props: GenericTableProps) {
    const { prefixCls, className, headerRef, bodyTableStyle, columns, scroll, data, fixed, emptyText, renderTableBody } = props;

    return (
        <div className={className}>
            {scroll && !!scroll.y && (
                <div className={`${prefixCls}-header`} ref={headerRef} style={bodyTableStyle ? { overflowY: "scroll" } : null}>
                    <BaseTable prefixCls={prefixCls} className={`${prefixCls}-fixed`} style={bodyTableStyle} columns={columns} data={data} fixed={fixed} hasBody={false} hasHead={true} />
                </div>
            )}
            {renderTableBody(
                <React.Fragment>
                    <BaseTable prefixCls={prefixCls} className={`${prefixCls}-fixed`} style={bodyTableStyle} columns={columns} data={data} fixed={fixed} hasBody={true} hasHead={!scroll || !scroll.y} />
                    {(!data || data.length === 0) && <div className={`${prefixCls}-placeholder`}>{emptyText}</div>}
                </React.Fragment>
            )}
        </div>
    );
}

export default React.memo(GenericTable);
