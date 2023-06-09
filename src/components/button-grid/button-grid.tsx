import { Space } from "antd";

interface ButtonGridProps {
  buttons?: JSX.Element[];
  direction?: "horizontal" | "vertical";
  spacing?: number;
  wrap?: boolean;
}

export const ButtonGrid = ({
  buttons,
  direction,
  spacing,
  wrap,
}: ButtonGridProps) => {
  const spaceDirection = direction ? direction : "horizontal";
  const spaceWrap = spaceDirection === "horizontal" ? wrap : false;

  return (
    <Space
      direction={spaceDirection}
      wrap={spaceWrap}
      size={spacing}
      style={{ padding: "50px" }}
    >
      {buttons?.map((button) => button)}
    </Space>
  );
};
