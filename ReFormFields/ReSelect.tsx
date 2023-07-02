import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";

interface IItems {
  title: string;
  value: string | number | boolean;
}

function ReSelect(props: {
  label: string;
  name: string;
  items: IItems[];
  type?: "multiple" | "tags" | undefined;
  searchable?: boolean;
  required?: boolean;
  disable?: boolean;
}) {
  const { label, name, items, type, required, searchable, disable } = props;
  const [rules, setRules] = useState<any[]>([]);

  useEffect(() => {
    setRules(
      required
        ? [{ required: true, message: `Please enter your ${label}` }]
        : []
    );
  }, []);

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select disabled={disable} allowClear mode={type} showSearch={searchable}>
        {items.map((item: any) => {
          const { value, title } = item;
          return <Select.Option value={value}>{title}</Select.Option>;
        })}
      </Select>
    </Form.Item>
  );
}

export default ReSelect;
