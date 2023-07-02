import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button, UploadProps, Form } from "antd";
import React, { useEffect, useState } from "react";

function ReUpload(props: {
  label: string;
  name: string;
  required?: boolean;
  BtnIcon?: any;
  BtnTitle: string;
  fileList: any[];
  fileListMaxCount: number;
  onBeforeUpload: Function;
  onRemove: Function;
  disable?: boolean;
  accept?: string;
  errorMessage: string;
}) {
  const {
    label,
    name,
    required,
    BtnIcon,
    fileList,
    fileListMaxCount,
    onBeforeUpload,
    onRemove,
    BtnTitle,
    disable,
    accept,
    errorMessage,
  } = props;
  const [rules, setRules] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    setRules(required ? [{ required: true, message: errorMessage }] : []);
  }, []);

  const uploadprops: UploadProps = {
    beforeUpload: async (fileData: any) => {
      setUploading(true);
      onBeforeUpload(fileData);
      setUploading(false);
      return true;
    },
    onRemove: (fileData: any) => {
      onRemove(fileData);
    },
    fileList,
    disabled: uploading,
    maxCount: fileListMaxCount,
    accept: accept,
  };

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Upload {...uploadprops}>
        <Button
          disabled={disable}
          icon={BtnIcon ? BtnIcon : <UploadOutlined />}
        >
          {BtnTitle}
        </Button>
      </Upload>
    </Form.Item>
  );
}

export default ReUpload;
