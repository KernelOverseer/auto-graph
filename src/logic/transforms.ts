import React from "react";
import { transforms } from "../interfaces/transforms";

export function getDisplayCoords(
  x: number,
  y: number,
  transform: transforms
): { x: number; y: number } {
  return {
    x: x + transform.offX,
    y: y + transform.offY,
  };
}
