import React from 'react';

export interface nodeData {
    x: number,
    y: number,
    id: string,
    visited?: boolean,
    active?: boolean,
}

export interface lineData {
    node1: string;
    node2: string;
}

export interface nodeProps extends nodeData {
    // setPos(x: number, y: number): { x: number; y: number };
  }

export interface lineProps {
    node1: nodeProps;
    node2: nodeProps;
}