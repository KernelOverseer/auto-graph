import { Collapse, CollapseProps, Typography } from "antd";
import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { editorProps } from "../interfaces/algorithms";

const codeAreaStyle = {
  fontFamily: '"Fira code", "Fira Mono", monospace',
  fontSize: 16,
  background: "#f5f5f5",
} as React.CSSProperties;

const CodeEditor: React.FC<editorProps> = ({ code, setCode }) => {
  return (
    <div style={{ textAlign: "left" }}>
      <Typography.Text>{"async (start, end) => {"}</Typography.Text>
      <div style={{ overflow: "scroll", maxHeight: 400 }}>
        <Editor
          style={codeAreaStyle}
          value={code}
          onValueChange={setCode}
          highlight={(code) => highlight(code, languages.js)}
          padding={15}
        />
      </div>
      <Typography.Text>{"}"}</Typography.Text>
    </div>
  );
};

export default CodeEditor;
