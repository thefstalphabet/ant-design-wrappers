import { Drawer } from "antd";

function ReDrawer(props: {
  children: any;
  visibility: boolean;
  title?: string | React.ReactNode;
  footer?: boolean | React.ReactNode;
  onCancel?: Function;
  width?: number;
  placement?: "top" | "right" | "bottom" | "left";
  closable?: boolean;
  extraContent?:React.ReactNode
}) {
  const {
    children,
    title,
    visibility,
    footer,
    onCancel,
    width,
    placement,
    closable,
    extraContent
  } = props;

  return (
    <Drawer
      visible={visibility}
      closable={closable}
      title={title}
      footer={footer}
      placement={placement ? placement : "right"}
      width={width}
      extra={extraContent}
      onClose={() => {
        onCancel && onCancel();
      }}
    >
      {children}
    </Drawer>
  );
}

export default ReDrawer;
