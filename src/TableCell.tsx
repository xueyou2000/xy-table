import React, { useContext } from "react";
import classNames from "classnames";
import { TableCellProps } from "./interface";
import { TableContext } from "./Context";

function TableCell(props: TableCellProps<any>) {
    const { prefixCls, className, column, record, rowIndex, expandIcon = null, fixed } = props;
    const cellPrefixCls = `${prefixCls}-cell`;
    const context = useContext(TableContext);
    const classString = classNames(cellPrefixCls, className, column.className, {
        [`${cellPrefixCls}-align-right`]: column.align === "right",
        [`${prefixCls}-fixed-columns-in-body`]: !!column.fixed && !!fixed
    });

    const content = (
        <React.Fragment>
            {expandIcon}
            {column.render ? column.render(record, rowIndex) : record[column.dataIndex]}
        </React.Fragment>
    );

    const _props = {
        className: classString,
        key: column.key,
        children: content
    };

    if (context.renderCell) {
        return React.createElement(context.renderCell, Object.assign({}, props, _props));
    } else {
        return <td {..._props} />;
    }
}

export default React.memo(TableCell);
