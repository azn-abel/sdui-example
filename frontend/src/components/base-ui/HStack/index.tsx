import React from "react";
import "./HStack.css";

export interface HStackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number | string;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  children: React.ReactNode;
}

const HStack: React.FC<HStackProps> = ({
  gap = 0,
  align = "center",
  justify = "flex-start",
  children,
  style,
  ...rest
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: align,
      justifyContent: justify,
      gap,
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);

export default HStack;
