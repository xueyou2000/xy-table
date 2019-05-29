import { ExpandProps, ExpandIconProps } from "./Expander/interface";

/**
 * 表格水平滚动条所在位置
 * @description left滚动到开头，right滚动到末尾, 其他则是中间
 */
export type ScrollPosition = "left" | "middle" | "right";

/**
 * 表格文本对齐方式
 */
export type TableAlign = "left" | "right";

/**
 * 自定义折叠图标
 */
export interface CustomizeExpandIconProps {}

/**
 * 表格列配置
 */
export interface TableColumn {
    /**
     * key
     */
    key?: string | number;
    /**
     * 列标题
     */
    title: React.ReactNode;
    /**
     * 数据字段名
     */
    dataIndex?: string;
    /**
     * 列样式
     */
    className?: string;
    /**
     * 列宽度
     */
    width?: number | string;
    /**
     * 是否固定列
     * @description 水平滚动时，此列将被固定
     */
    fixed?: boolean | "left" | "right";
    /**
     * 文本对齐方式
     */
    align?: "left" | "right";
    /**
     * 自定义渲染
     */
    render?: (record: any, rowIndex: number) => React.ReactNode;
}

/**
 * 表格列
 */
export interface TableCellProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 列配置
     */
    column?: TableColumn;
    /**
     * 列数据
     */
    record: any;
    /**
     * 所在行
     */
    rowIndex: number;
    /**
     * 扩展内容图标
     * @description 当 expandIconAsCell = false 时才在列中显示
     */
    expandIcon?: React.ReactNode | false;
    /**
     * 表格是否固定
     */
    fixed?: false | "left" | "right";
}

/**
 * 表格行
 */
export interface TableRowProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 列配置
     */
    columns?: TableColumn[];
    /**
     * 要呈现的数据
     */
    record?: any;
    /**
     * 行索引
     */
    rowIndex: number;
    /**
     * 表格是否固定
     */
    fixed?: false | "left" | "right";
}

/**
 * 主体表格
 */
export interface TableMainProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 列配置
     */
    columns?: TableColumn[];
    /**
     * 要呈现的数据
     */
    data?: any[];
    /**
     * 空内容时的占位符
     */
    emptyText?: React.ReactNode;
    /**
     * 表格是否可以在x/y方向滚动
     */
    scroll?: { x?: boolean | number | string; y?: boolean | number | string };
    /**
     * 滚动条横向事件
     */
    onScrollLeft?: (position: ScrollPosition, e: React.UIEvent<HTMLDivElement>) => void;
    /**
     * 更新表格行高度
     */
    onRowHeightUpdate?: (rowsHeight: number[]) => void;
}

/**
 * 悬浮表格
 */
export interface FixedTableProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 空内容时的占位符
     */
    emptyText?: React.ReactNode;
    /**
     * 列配置
     */
    columns?: TableColumn[];
    /**
     * 表格是否可以在x/y方向滚动
     */
    scroll?: { x?: boolean | number | string; y?: boolean | number | string };
    /**
     * 要呈现的数据
     */
    data?: any[];
    /**
     * 悬浮方向
     */
    fixed: "left" | "right";
    /**
     * 滚动条事件
     */
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

/**
 * 通用表格
 * @description 封装主体表格和悬浮表格通用部分
 */
export interface GenericTableProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 表格头引用
     */
    headerRef?: React.MutableRefObject<any>;
    /**
     * 表格体样式
     */
    bodyTableStyle?: React.CSSProperties;
    /**
     * 列配置
     */
    columns?: TableColumn[];
    /**
     * 表格是否可以在x/y方向滚动
     */
    scroll?: { x?: boolean | number | string; y?: boolean | number | string };
    /**
     * 要呈现的数据
     */
    data?: any[];
    /**
     * 悬浮方向
     */
    fixed: "left" | "right" | false;
    /**
     * 空内容时的占位符
     */
    emptyText?: React.ReactNode;
    /**
     * 渲染表格体
     */
    renderTableBody?: (bodyTable: React.ReactNode) => React.ReactNode;
}

/**
 * 表格
 */
export interface TableProps extends ExpandProps, TableContextState, SelectedRowsProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 列配置
     */
    columns?: TableColumn[];
    /**
     * 要呈现的数据
     */
    data?: any[];
    /**
     * 表格是否可以在x/y方向滚动
     */
    scroll?: { x?: boolean | number | string; y?: boolean | number | string };
    /**
     * 空内容时的占位符
     */
    emptyText?: React.ReactNode;
}

/**
 * 基础表格
 */
export interface BaseTableProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 列配置
     */
    columns?: TableColumn[];
    /**
     * 要呈现的数据
     */
    data?: any[];
    /**
     * 表格是否固定
     */
    fixed?: false | "left" | "right";
    /**
     * 是否有表格体
     */
    hasBody?: boolean;
    /**
     * 是否有表格头
     */
    hasHead?: boolean;
}

export interface TableContextState {
    /**
     * 自定义渲染列
     */
    renderCell?: (props: TableCellProps) => JSX.Element;
    /**
     * 自定义渲染行
     */
    renderRow?: (props: TableRowProps) => JSX.Element;
    /**
     * 文本对齐方式
     */
    align?: TableAlign;
    /**
     * 当前鼠标悬停行
     */
    hoverRowIndex?: number;
    /**
     * 设置鼠标悬停行
     */
    setRowIndex?: (index: number) => void;
    /**
     * 获取复选框列定义
     */
    getCheckboxColumn?: (columns: TableColumn[]) => TableColumn[];
}

export interface ExpanderContextState {
    /**
     * 自定义折叠图标
     */
    expandIcon?: (props: ExpandIconProps) => JSX.Element;
    /**
     * 渲染扩展行内容
     */
    expandedRowRender?: (record: any, expanded: boolean) => React.ReactNode;
    /**
     * 是否点击行,切换扩展内容的显示/隐藏
     */
    expandRowByClick?: boolean;
    /**
     * 是否显示折叠图标
     */
    showExpandIcon?: boolean;
    /**
     * 获取列配置
     * @description 扩展图标作为独立行时，多插入一个特殊配置
     */
    getFullColumns?: (baseColumns: TableColumn[]) => TableColumn[];
    /**
     * 扩展图标是否作为单独的列
     */
    expandIconAsCell?: boolean;
    /**
     * 扩展图标列索引
     * @description 当 expandIconAsCell 为 false 时候，指定将扩展图标插入到哪一列
     */
    expandIconColumnIndex?: number;
    /**
     * 扩展内容展开的keys
     */
    expandedRowKeys?: number[];
    /**
     * 某一行的折叠状态改变
     */
    onExpand?: (key: number, expanded: boolean) => void;
}

/**
 * 选择行
 */
export interface SelectedRowsProps {
    /**
     * 复选框选择行
     */
    selectedRowIndexs?: number[];
    /**
     * 默认复选框选择行
     */
    defaultSelectedRowIndexs?: number[];
    /**
     * 禁用选择行
     * @description 返回 true 则禁用此行，不能选择
     */
    disabledRowIndexs?: (recode: any) => boolean;
    /**
     * 复选框选择事件
     */
    onChange?: (selectRecods: any[], selectedRowIndexs: number[]) => void;
}
