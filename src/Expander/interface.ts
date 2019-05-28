import { TableColumn } from "../interface";

/**
 * 折叠图标
 */
export interface ExpandIconProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 是否折叠
     */
    expanded?: boolean;
    /**
     * 要呈现的数据
     */
    record?: any;
    /**
     * 表格行索引
     */
    rowIndex?: number;
    /**
     * 点击事件
     */
    onClick: () => void;
}

/**
 * 扩展内容相关属性
 */
export interface ExpandProps {
    /**
     * 自定义折叠图标
     */
    expandIcon?: (props: ExpandIconProps) => JSX.Element;
    /**
     * 是否点击行,切换扩展内容的显示/隐藏
     */
    expandRowByClick?: boolean;
    /**
     * 扩展图标是否作为单独的列
     */
    expandIconAsCell?: boolean;
    /**
     * 渲染扩展行内容
     */
    expandedRowRender?: (record: any, expanded: boolean) => React.ReactNode;
    /**
     * 当前展开的扩展内容
     * @description 这里的 key 与 行索引匹配
     */
    expandedRowKeys?: number[];
    /**
     * 默认展开的扩展内容
     */
    defaultExpandAllRows?: number[];
    /**
     * 展开的扩展内容改变
     */
    onExpandedRowsChange?: (rows: number[]) => void;
    /**
     * 展开/折叠事件
     */
    onExpand?: (record: any, expanded: boolean) => void;
    /**
     * 扩展图标列索引
     * @description 当 expandIconAsCell 为 false 时候，指定将扩展图标插入到哪一列
     */
    expandIconColumnIndex?: number;
}

/**
 * 扩展内容行渲染
 */
export interface ExpandRowProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 行索引
     */
    rowIndex: number;
    /**
     * 数据
     */
    record: any;
    /**
     * 列配置
     */
    columns: TableColumn[];
    /**
     * 是否折叠
     */
    expanded?: boolean;
    /**
     * 渲染扩展行内容
     */
    expandedRowRender?: (record: any, expanded: boolean) => React.ReactNode;
}
