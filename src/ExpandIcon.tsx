import React, { useContext } from "react";
import classNames from "classnames";
import { ExpandIconProps } from "./interface";
import { ExpanderContext } from "./Context";

function ExpandIcon(props: ExpandIconProps) {
    const { prefixCls, rowIndex, record } = props;
    const context = useContext(ExpanderContext);
    const expanded = context && context.expandedRowKeys.some((x) => x === rowIndex);
    const classString = classNames(`${prefixCls}-expand-icon`, `${prefixCls}-${expanded === false ? "collapsed" : "expanded"}`, {
        [`${prefixCls}-expand-inline`]: !context.expandIconAsCell
    });

    function clickHandle() {
        if (!context.expandRowByClick) {
            context.onExpand(rowIndex, !expanded);
        }
    }

    if (context.expandIcon) {
        return React.createElement(context.expandIcon, { expanded, record, onClick: clickHandle });
    } else {
        return <span onClick={clickHandle} className={classString} />;
    }
}

export default React.memo(ExpandIcon);
