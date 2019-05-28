import React, { useContext } from "react";
import { ExpanderContext } from "../Context";
import { ExpandRowProps } from "./interface";

function ExpandRow(props: ExpandRowProps) {
    const { prefixCls, rowIndex, record, columns, expanded, expandedRowRender } = props;
    const context = useContext(ExpanderContext);

    // 填充前面的占位符, 让内容与折叠图标对齐
    const indents = [];
    for (let i = 0; i < context.expandIconColumnIndex; ++i) {
        indents.push(<td />);
    }

    return (
        <tr key={`${rowIndex}-extra-row`} className={`${prefixCls}-expand-row`} style={{ display: expanded === false ? "none" : null }}>
            {context.expandIconAsCell && indents}
            <td colSpan={context.getFullColumns(columns).length}>{expandedRowRender(record, expanded)}</td>
        </tr>
    );
}

export default React.memo(ExpandRow);
