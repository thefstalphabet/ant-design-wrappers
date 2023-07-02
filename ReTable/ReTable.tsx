import { Table, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { SortOrder } from "antd/lib/table/interface";
import { ReactNode, useEffect, useState } from "react";
import "./Styles.css";

const headerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const headerOptions = {
  display: "grid",
  gridAutoFlow: "column",
  gap: "1rem",
};
interface IHeaderButtons {
  title: string;
  icon?: ReactNode;
  onClick?: any;
  type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
  disabled?: boolean;
  href?: string;
  loading?: boolean;
  size?: "large" | "middle" | "small";
}
interface IPagination {
  pageSize: number;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  pageSizeOptions: string[] | number[];
  responsive?: boolean;
  onChange: any;
}
interface IRowSelection {
  selectedRowKeys: string[] | number[];
  type: "checkbox" | "radio";
  setSelectedRowKeys: Function;
  rowKey?: string; // define when using the row selection and you want to change your selection key from id to somthing
}
interface IScroll {
  x: string | number | true;
  y: string | number;
}

interface IColumnOptions {
  sorting?: {
    columns: string[];
    sortingDirections?: SortOrder[];
  };
  filter?: {
    columns: string[];
    filterSearch?: boolean;
  };
}

interface IExpandable {
  rowExpandable?: (record: any) => boolean;
  expandedRowRender: (record: any, index: number) => ReactNode;
  expandIcon?: (props: any) => ReactNode;
  expandRowByClick?: boolean; // Whether to expand row by clicking anywhere in the whole row
}

function ReTable(props: {
  className?: string;
  columns: ColumnsType<object>;
  data: any[];
  loading?: boolean;
  showHeader?: boolean;
  name?: string | ReactNode;
  headerButtons?: IHeaderButtons[];
  bordered?: boolean;
  pagination?: IPagination | false;
  rowSelection?: IRowSelection;
  scroll?: IScroll;
  columnOptions?: IColumnOptions;
  expandable?: IExpandable;
}) {
  const {
    columns,
    data,
    loading,
    showHeader,
    name,
    headerButtons,
    bordered,
    pagination,
    rowSelection,
    scroll,
    className,
    columnOptions,
    expandable,
  } = props;

  const [newColumns, setNewColumns] = useState<ColumnsType<object>>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  console.log(expandedRows);
  

  const getFilterOptionItems = (tableData: object[], key: string) => {
    let uniqueItems: object[] = [];
    tableData.forEach((data: any) => {
      if (data.hasOwnProperty(key)) {
        const newItem = {
          text: data[key],
          value: data[key],
        };
        const isAlreadyPresent = uniqueItems.some((item: any) => {
          return item.text === newItem.text && item.value === newItem.value;
        });
        if (!isAlreadyPresent) {
          uniqueItems.push(newItem);
        }
      }
    });
    return uniqueItems;
  };

  const setColumnSortingOption = (col: any, index: number) => {
    let newCol;
    if (
      columnOptions?.sorting &&
      columnOptions?.sorting?.columns.includes(col.key)
    ) {
      const dataType = typeof data[index][col.key]; // getting data type of column data
      newCol = {
        ...col,
        sorter: (a: any, b: any) => {
          switch (dataType) {
            case "string":
              return a[col.key].localeCompare(b[col.key]);
            case "number":
              return a[col.key] - b[col.key];
            default: // its for boolean values
              return (a[col.key] ? 1 : -1) - (b[col.key] ? 1 : -1);
          }
        },
      };
    } else return col;
    return newCol;
  };

  const setColumnFilterOption = (col: any) => {
    let newCol;
    const columnKey = col.key;
    if (
      columnOptions?.sorting &&
      columnOptions?.filter?.columns.includes(columnKey)
    ) {
      const filterItems = getFilterOptionItems(data, columnKey);
      newCol = {
        ...col,
        filterSearch: columnOptions.filter.filterSearch,
        filters: filterItems,
        onFilter: (value: string | number | boolean, row: any) => {
          const typeOfValue = typeof value;
          if (typeOfValue === "string") {
            return row[columnKey].includes(value);
          } else {
            return String(row[columnKey]).includes(String(value));
          }
        },
      };
    } else return col;
    return newCol;
  };

  const setColumnOptions = (columns: ColumnsType<object>) => {
    const newColumns = columns.map((col: any, index: number) => {
      let newCol;
      newCol = setColumnSortingOption(col, index);
      newCol = setColumnFilterOption(newCol);
      return newCol;
    });
    setNewColumns(newColumns);
  };

  const handleRowSelectionChanges = (
    selectedRowKeys: any,
    selectedRows: any,
    info: { type: string }
  ) => {
    const { type } = info;
    const key = rowSelection?.rowKey ? rowSelection?.rowKey : "id";
    if (type === "all" && rowSelection?.selectedRowKeys.length === 0) {
      rowSelection?.setSelectedRowKeys(data.map((row: any) => row[`${key}`]));
    } else if (type === "single") {
      rowSelection?.setSelectedRowKeys(selectedRowKeys);
    } else {
      rowSelection?.setSelectedRowKeys([]);
    }
  };

  const componentProps = {
    columns: columnOptions ? newColumns : columns,
    dataSource: data,
    loading: loading,
    rowKey: rowSelection?.rowKey,
    showHeader: showHeader,
    sortDirections: columnOptions?.sorting?.sortingDirections,
    bordered: bordered,
    pagination: pagination,
    scroll: scroll,
    expandable: {
      ...expandable,
      expandedRowKeys: expandedRows,
      onExpandedRowsChange: (expandedRows: any) => {
        setExpandedRows(expandedRows);
      },
    },
    rowSelection: rowSelection
      ? {
          ...rowSelection,
          onChange: handleRowSelectionChanges,
        }
      : undefined,
    title: () => {
      return (
        <div style={headerStyles}>
          {typeof name === "string" ? <h2>{name}</h2> : name}
          <div style={headerOptions}>
            {headerButtons?.map((btn: IHeaderButtons, index: number) => {
              const { title } = btn;
              return (
                <Button key={index} {...btn}>
                  {title}
                </Button>
              );
            })}
          </div>
        </div>
      );
    },
  };

  useEffect(() => {
    columnOptions && setColumnOptions(columns);
  }, []);

  return (
    <div className="table">
      <Table className={className} {...componentProps} />
    </div>
  );
}

export default ReTable;
