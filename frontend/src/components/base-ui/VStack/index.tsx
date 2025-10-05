import React from "react";
import "./VStack.css";

export interface HStackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number | string;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  children: React.ReactNode;
}

const VStack: React.FC<HStackProps> = ({
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
      flexDirection: "column",
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

export default VStack;
