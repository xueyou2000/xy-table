import classNames from "classnames";
import { BaseTableProps } from "./interface";
import React, { useContext } from "react";
import { ExpanderContext } from "./Context";
import TableRow from "./TableRow";
import { ExpandFlag } from "./Table";

function BaseTable(props: BaseTableProps) {
    const { prefixCls, className, style, columns, fixed = false, hasBody = true, hasHead = true, data } = props;
    const expanderContext = useContext(ExpanderContext);
    const [cols, ths] = createColAndThead();

    function createColAndThead() {
        const cols = [];
        const ths = [];

        expanderContext.getFullColumns(columns).forEach((x) => {
            if (x.title !== ExpandFlag) {
                cols.push(<col style={x.width ? { width: x.width, minWidth: x.width } : null} />);
                ths.push(<th className={!!x.fixed && !fixed ? `${prefixCls}-fixed-columns-in-body` : null}>{x.title}</th>);
            } else {
                cols.push(<col className={`${prefixCls}-expand-icon-col`} />);
                ths.push(<th className={`${prefixCls}-expand-icon-th`} rowSpan={1} />);
            }
        });

        return [cols, ths];
    }

    return (
        <table className={classNames(className)} style={style}>
            <colgroup>{cols}</colgroup>
            {hasHead && (
                <thead className={`${prefixCls}-thead`}>
                    <tr>{ths}</tr>
                </thead>
            )}
            {hasBody && (
                <tbody className={`${prefixCls}-tbody`}>
                    {data.map((d, i) => (
                        <TableRow prefixCls={prefixCls} fixed={fixed} columns={columns} record={d} rowIndex={i} />
                    ))}
                </tbody>
            )}
        </table>
    );
}

export default React.memo(BaseTable);
