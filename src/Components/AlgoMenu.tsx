import React, { useState } from "react";
import { actionProps } from "../interfaces/nodeData";
import { Button, Col, Row, Select } from "antd";
import { reorderGraph } from "../logic/algorithms";
import {
  RocketOutlined,
  ShareAltOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { algoFunction } from "../interfaces/nodeActions";
import { algoInfo } from "../interfaces/algorithms";

const algorithms: algoInfo[] = [
  {
    label: "Breadth First Search",
    value: "bfs",
    function: reorderGraph,
  },
  {
    label: "Depth First Search",
    value: "dfs",
    function: async () => {},
  },
  { label: "Dijkstra", value: "dijkstra", function: async () => {} },
];

const AlgoMenu: React.FC<actionProps> = ({ actions }) => {
  const [selected, setSelected] = useState<algoInfo>(algorithms[0]);

  async function runAlgorithm(algo: algoFunction, name: string) {
    actions.resetGraph();
    actions.setRunning(name);
    await algo();
    actions.setRunning(undefined);
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Select
          style={{ width: "100%" }}
          onSelect={(_, value) => {
            setSelected(value);
          }}
          value={selected}
          defaultValue={algorithms[0]}
          options={algorithms}
        />
      </Col>
      <Col span={24}>
        <Button.Group>
          <Button
            icon={<RocketOutlined />}
            onClick={() => {
              runAlgorithm(selected.function, selected.value);
            }}
            loading={actions.running !== undefined}
          >
            Run
          </Button>
          <Button icon={<UndoOutlined />} onClick={actions.resetGraph}>
            Reset Graph
          </Button>
        </Button.Group>
      </Col>
    </Row>
  );
};

export default AlgoMenu;
