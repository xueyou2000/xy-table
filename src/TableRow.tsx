import React, { useContext } from "react";
import classNames from "classnames";
import { TableRowProps } from "./interface";
import { TableContext, ExpanderContext } from "./Context";
import TableCell from "./TableCell";
import ExpandIcon from "./ExpandIcon";
import ExpandRow from "./ExpandRow";
import { ExpandFlag } from "./Table";

function TableRow(props: TableRowProps<any>) {
    const { prefixCls, className, columns, record, fixed, rowIndex } = props;
    const context = useContext(TableContext);
    const expanderContext = useContext(ExpanderContext);
    const expandIcon = <ExpandIcon record={record} prefixCls={prefixCls} rowIndex={rowIndex} />;
    const expanded = expanderContext.expandedRowKeys.some((x) => x === rowIndex);

    function clickHandle() {
        if (expanderContext.expandRowByClick) {
            expanderContext.onExpand(rowIndex, !expanded);
        }
    }

    const content = expanderContext.getFullColumns(columns).map((x, i) => {
        if (x.title !== ExpandFlag) {
            return (
                <TableCell
                    prefixCls={prefixCls}
                    expandIcon={expanderContext.expandIconAsCell === false && expanderContext.showExpandIcon && i === expanderContext.expandIconColumnIndex ? expandIcon : null}
                    record={record}
                    fixed={fixed}
                    rowIndex={rowIndex}
                    column={x}
                />
            );
        } else {
            return <td className={`${prefixCls}-expand-icon-cell`}>{expandIcon}</td>;
        }
    });

    const _props = {
        className: classNames(`${prefixCls}-row`, className),
        key: rowIndex,
        onClick: clickHandle,
        children: content
    };

    function renderRow() {
        if (context.renderRow) {
            return React.createElement(context.renderRow, Object.assign({}, props, _props), content);
        } else {
            return <tr {..._props} />;
        }
    }

    return (
        <React.Fragment>
            {renderRow()}
            {expanderContext.expandedRowRender && <ExpandRow prefixCls={prefixCls} rowIndex={rowIndex} record={record} columns={columns} expanded={expanded} expandedRowRender={expanderContext.expandedRowRender} />}
        </React.Fragment>
    );
}

export default React.memo(TableRow);
