import React, { useState, useEffect } from "react";

export type SDUISchema = {
  title: string;
  components: SDUIComponent[];
};

export type SDUIComponent = {
  type: string;
  content?: string;
  children?: SDUIComponent[];
};

const renderComponent = (component: SDUIComponent): React.ReactNode => {
  const { type, content, children } = component;

  switch (type) {
    case "text":
      return <p>{content}</p>;

    case "heading":
      return <h2>{content}</h2>;

    case "button":
      return <button>{content}</button>;

    case "container":
      return (
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          {children?.map((child, idx) => (
            <React.Fragment key={idx}>{renderComponent(child)}</React.Fragment>
          ))}
        </div>
      );

    default:
      return <div>Unknown component: {type}</div>;
  }
};

export const SDUIRenderer: React.FC<{ schema: SDUISchema }> = ({ schema }) => {
  document.title = schema.title;
  return (
    <div>
      <h1>{schema.title}</h1>
      {schema.components.map((component, idx) => (
        <React.Fragment key={idx}>{renderComponent(component)}</React.Fragment>
      ))}
    </div>
  );
};

export const SDUIBase: React.FC = () => {
  const [schema, setSchema] = useState<SDUISchema | null>(null);

  const fetchSchema = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: SDUISchema = await response.json();
      setSchema(data);
    } catch (error) {
      console.error("Failed to fetch schema:", error);
    }
  };

  useEffect(() => {
    fetchSchema(
      `http://127.0.0.1:8000/api/ui?path=${window.location.pathname}`
    );
  }, []);

  if (schema) {
    return <SDUIRenderer schema={schema} />;
  } else {
    return <p>Loading...</p>;
  }
};
