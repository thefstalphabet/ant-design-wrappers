import { Modal } from "antd";

function ReModal(props: {
  children: any;
  title?: string | React.ReactNode;
  visibility?: boolean;
  footer?: boolean | React.ReactNode;
  onOkay: Function;
  onCancel: Function;
  width?: number;
  closable?: boolean;
  onOkayBtnTitle?: string
}) {
  const {
    children,
    onOkay,
    title,
    visibility,
    footer,
    onCancel,
    width,
    closable,
    onOkayBtnTitle
  } = props;

  return (
    <Modal
      width={width ? width : 800}
      closable={closable}
      title={title}
      visible={visibility}
      okText={onOkayBtnTitle}
      onOk={() => {
        onOkay();
      }}
      onCancel={() => {
        onCancel();
      }}
      footer={footer}
    >
      {children}
    </Modal>
  );
}

export default ReModal;
