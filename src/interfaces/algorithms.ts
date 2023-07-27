import React from "react";

export interface algoInfo {
  label: string;
  value: string;
  code: string;
}

export interface editorProps {
  code: string;
  setCode: (code: string) => void;
}
