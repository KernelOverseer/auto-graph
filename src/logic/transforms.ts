import React from "react";
import { transforms } from "../interfaces/transforms";

export function getDisplayCoords(
  x: number,
  y: number,
  transform: transforms
): { x: number; y: number } {
  return {
    x: x * transform.zoom + transform.offX,
    y: y * transform.zoom + transform.offY,
  };
}

export function getCoordsFromDisplay(
  x: number,
  y: number,
  transform: transforms
): { x: number; y: number } {
  return {
    x: (x - transform.offX) / transform.zoom,
    y: (y - transform.offY) / transform.zoom,
  };
}
