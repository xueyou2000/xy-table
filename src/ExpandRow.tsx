import React, { useContext } from "react";
import classNames from "classnames";
import { ExpandRowProps } from "./interface";
import { ExpanderContext } from "./Context";

function ExpandRow(props: ExpandRowProps) {
    const { prefixCls, rowIndex, record, columns, expanded, expandedRowRender } = props;
    const context = useContext(ExpanderContext);

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
