import { Collapse, CollapseProps, Typography } from "antd";
import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { editorProps } from "../interfaces/algorithms";

const containerStyle = {
  textAlign: "left",
  background: "white",
  padding: 5,
} as React.CSSProperties;

const textStyle = {
  fontFamily: '"Fira code", "Fira Mono", monospace',
  fontSize: 16,
} as React.CSSProperties;

const codeAreaStyle = {
  fontFamily: '"Fira code", "Fira Mono", monospace',
  fontSize: 16,
  background: "white",
  border: "1px solid #f3f3f3",
} as React.CSSProperties;

const CodeEditor: React.FC<editorProps> = ({ code, setCode }) => {
  return (
    <div style={containerStyle}>
      <p style={textStyle}>
        <span style={{ color: "#0077aa" }}>{"async "}</span>
        <span style={{ color: "#aaaaaa" }}>{"("}</span>start
        <span style={{ color: "#aaaaaa" }}>,</span> end
        <span style={{ color: "#aaaaaa" }}>{")"}</span>
        <span style={{ color: "#9a6e3a" }}>{" => "}</span>
        <span style={{ color: "#aaaaaa" }}>{"{"}</span>
      </p>
      <div
        className="editor-container"
        style={{ overflow: "scroll", maxHeight: 400 }}
      >
        <Editor
          style={codeAreaStyle}
          value={code}
          onValueChange={setCode}
          highlight={(code) => highlight(code, languages.js)}
          padding={15}
        />
      </div>
      <p style={textStyle}>
        <span style={{ color: "#aaaaaa" }}>{"}"}</span>
      </p>
    </div>
  );
};

export default CodeEditor;
