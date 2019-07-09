import classNames from "classnames";
import React, { useContext } from "react";
import { ExpanderContext, TableContext } from "./Context";
import ExpandIcon from "./Expander/ExpandIcon";
import ExpandRow from "./Expander/ExpandRow";
import { TableRowProps } from "./interface";
import { ExpandFlag } from "./Table";
import TableCell from "./TableCell";

function TableRow(props: TableRowProps) {
    const { prefixCls, className, columns, record, fixed, rowIndex } = props;
    const context = useContext(TableContext);
    const epContext = useContext(ExpanderContext);
    const expandIcon = <ExpandIcon record={record} prefixCls={prefixCls} rowIndex={rowIndex} onClick={null} />;
    const expanded = epContext.expandedRowKeys.some((x) => x === rowIndex);

    function clickHandle() {
        if (epContext.expandRowByClick) {
            epContext.onExpand(rowIndex, !expanded);
        }
    }

    function onMouseEnter(e: React.MouseEvent<HTMLElement>) {
        context.setRowIndex(rowIndex);
    }

    function onMouseLeave(e: React.MouseEvent<HTMLElement>) {
        context.setRowIndex(null);
    }

    const content = (fixed === false ? epContext.getFullColumns(columns) : columns).map((x, i) => {
        if (x.title !== ExpandFlag) {
            return (
                <TableCell
                    key={`${rowIndex}-${x.key}`}
                    column={x}
                    fixed={fixed}
                    record={record}
                    rowIndex={rowIndex}
                    prefixCls={prefixCls}
                    expandIcon={epContext.expandIconAsCell === false && epContext.showExpandIcon && i === epContext.expandIconColumnIndex ? expandIcon : null}
                />
            );
        } else {
            return (
                <td key={`${rowIndex}-${ExpandFlag}`} className={`${prefixCls}-expand-icon-cell`}>
                    {expandIcon}
                </td>
            );
        }
    });

    const _props = {
        className: classNames(`${prefixCls}-row`, className, { [`${prefixCls}-hover`]: context.hoverRowIndex === rowIndex }),
        onMouseEnter,
        onMouseLeave,
        children: content,
        onClick: clickHandle,
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
            {epContext.expandedRowRender && <ExpandRow prefixCls={prefixCls} rowIndex={rowIndex} record={record} columns={columns} expanded={expanded} expandedRowRender={epContext.expandedRowRender} />}
        </React.Fragment>
    );
}

export default React.memo(TableRow);
