import { notification } from "antd";

interface IConfig {
  header?: string
  description: string,
  duration: number,
  placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight",
  type: "success" | "error" | "info" | "warning",
}

export const ReNotification = (config: IConfig) => {
  const { header, description, type, duration, placement } = config
  notification[`${type}`]({
    message: header,
    description: description,
    duration: duration,
    placement: placement
  });
};
