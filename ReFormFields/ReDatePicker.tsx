import React, { useEffect, useState } from "react";
import { DatePicker, Form } from "antd";
import moment from "moment";

function ReDatePicker(props: {
  label: string;
  name: string;
  required?: boolean;
  type: "simple" | "rangePicker";
  featureDates?: boolean;
  dateFormat?: string;
  width?: string;
  disable?: boolean;
}) {
  const {
    label,
    name,
    required,
    featureDates,
    dateFormat,
    type,
    width,
    disable,
  } = props;
  const { RangePicker } = DatePicker;
  const [rules, setRules] = useState<any[]>([]);
  const [element, setElement] = useState<any>();

  function disabledFutureDate(current: any) {
    return featureDates && current && current > moment().endOf("day");
  }

  useEffect(() => {
    setRules(
      required
        ? [{ required: true, message: `Please enter your ${label}` }]
        : []
    );

    switch (type) {
      case "simple":
        setElement(
          <DatePicker
            format={dateFormat}
            disabled={disable}
            disabledDate={disabledFutureDate}
            style={{ width: width }}
          />
        );
        break;
      case "rangePicker":
        setElement(
          <RangePicker
            disabled={disable}
            format={dateFormat}
            disabledDate={disabledFutureDate}
            style={{ width: width }}
          />
        );
        break;
      default:
        break;
    }
  }, []);

  return (
    <Form.Item label={label} name={name} rules={rules}>
      {element}
    </Form.Item>
  );
}

export default ReDatePicker;
