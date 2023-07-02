import { Checkbox, Form } from "antd";
import React from "react";

function ReCheckBox(props: { label: string; name: string; disable?: boolean }) {
  const { label, name, disable } = props;
  return (
    <Form.Item name={name} valuePropName="checked">
      <Checkbox disabled={disable}>{label}</Checkbox>
    </Form.Item>
  );
}

export default ReCheckBox;
