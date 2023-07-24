import React from 'react';

export interface nodeData {
    x: number,
    y: number
    id: string;
}

export interface lineData {
    node1: string;
    node2: string;
}

export interface nodeProps {
    x: number;
    y: number;
    id: string;
    // setPos(x: number, y: number): { x: number; y: number };
  }

export interface lineProps {
    node1: nodeProps;
    node2: nodeProps;
}