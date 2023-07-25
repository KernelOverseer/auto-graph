import React from "react";

export interface algoInfo {
  label: string;
  value: string;
  function: () => Promise<void>;
}
