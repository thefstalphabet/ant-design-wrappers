import { Form, Input, InputNumber } from "antd";
import { useState, useEffect } from "react";

function ReInput(props: {
  label: string;
  name: string;
  type: "simple" | "email" | "password" | "textArea" | "number" | "url";
  required?: boolean;
  min?: number;
  max?: number;
  textAreaWordLimit?: number;
  disable?: boolean;
  noStyle?: boolean;
}) {
  const {
    label,
    name,
    type,
    required,
    min,
    max,
    textAreaWordLimit,
    disable,
    noStyle,
  } = props;
  const [rules, setRules] = useState<any[]>([]);
  const [element, setElement] = useState<any>(<Input disabled={disable} />);

  useEffect(() => {
    setRules(
      required
        ? [{ required: true, message: `Please enter your ${label}` }]
        : []
    );

    switch (type) {
      case "password":
        setElement(<Input.Password disabled={disable} />);
        break;
      case "number":
        setElement(
          <InputNumber disabled={disable} style={{ width: "100%" }} />
        );
        break;
      case "textArea":
        setElement(
          <Input.TextArea
            showCount
            maxLength={textAreaWordLimit}
            autoSize={{ minRows: 4, maxRows: 4 }}
            allowClear
            disabled={disable}
          />
        );
        break;

      default:
        break;
    }

    switch (type) {
      case "email":
        setRules((pre: any) => [
          ...pre,
          { type: type, message: "Please enter a valid email" },
        ]);
        break;
      case "url":
        setRules((pre: any) => [
          ...pre,
          { type: type, message: "Please enter a valid url" },
        ]);
        break;
      case "simple":
        if (min) {
          setRules((pre: any) => [
            ...pre,
            {
              min: min,
              message: `${label} must be at least ${min} characters`,
            },
          ]);
        }
        if (max) {
          setRules((pre: any) => [
            ...pre,
            {
              max: max,
              message: `${label} at max ${max} characters`,
            },
          ]);
        }
        break;
      default:
        break;
    }
  }, []);

  return (
    <Form.Item label={label} name={name} rules={rules} noStyle={noStyle}>
      {element}
    </Form.Item>
  );
}

export default ReInput;
