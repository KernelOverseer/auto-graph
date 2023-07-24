import React from 'react';
import { nodeActions } from './nodeActions';

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
    actions: nodeActions;
  }

export interface actionProps {
    actions: nodeActions;
}

export interface lineProps {
    node1: nodeData;
    node2: nodeData;
}