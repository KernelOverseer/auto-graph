import React, { useState } from "react";
import { actionProps } from "../interfaces/nodeData";
import { Button, Col, Collapse, Row, Select, message } from "antd";
import { breadthFirstSearch, depthFirstSearch } from "../logic/algorithms";
import {
  RocketOutlined,
  ShareAltOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { algoFunction, nodeOperations } from "../interfaces/nodeActions";
import { algoInfo } from "../interfaces/algorithms";
import CodeEditor from "./CodeEditor";

function requireStartEnd(start: boolean, end: boolean): boolean {
  if (start) {
    message.warning("Please select a starting node");
    return true;
  }
  if (end) {
    message.warning("Please select an end node");
    return true;
  }
  return false;
}

const algorithms: algoInfo[] = [
  {
    label: "Breadth First Search",
    value: "bfs",
    function: breadthFirstSearch,
  },
  {
    label: "Depth First Search",
    value: "dfs",
    function: depthFirstSearch,
  },
  //   { label: "Dijkstra", value: "dijkstra", function: async () => {} },
];

const floatingMenuStyle = {
  position: "fixed",
  top: 80,
  left: 10,
  width: 500,
} as React.CSSProperties;

const AlgoMenu: React.FC<actionProps> = ({ actions }) => {
  const collapseItems = [
    {
      key: "1",
      label: "Algorithms",
      children: <AlgoRunner actions={actions} />,
    },
  ];

  return (
    <div style={floatingMenuStyle}>
      <Collapse items={collapseItems} defaultActiveKey={["1"]} />
    </div>
  );
};

const AlgoRunner: React.FC<actionProps> = ({ actions }) => {
  const [selected, setSelected] = useState<algoInfo>(algorithms[0]);
  const [code, setCode] = useState<string>("");

  async function runCode(code: string, label: string) {
    const graph: nodeOperations = window as any;
    if (
      requireStartEnd(
        graph.getStart() === undefined,
        graph.getEnd() === undefined
      )
    )
      return;
    actions.select(actions.selected!); //removing selection
    actions.resetGraph();
    await new Promise((resolve) => setTimeout(resolve, 0)); //give the component time to refresh state
    actions.setRunning(label);
    try {
      await new Promise((resolve) => {
        (window as any).codeResolve = resolve;
        eval(
          `(async () => {
            try{
            let start = getStart();
            let end = getEnd();
            ${code}
            }catch(err)
            {
              console.log("ERROR", err);
            }
            window.codeResolve();
            window.codeResolve=undefined})()`
        );
      });
    } catch (error) {
      message.error("An error occured with your code");
      console.log(error);
    }
    actions.setRunning(undefined);
  }

  async function runAlgorithm(algo: algoFunction, name: string) {
    actions.select(actions.selected!);
    actions.resetGraph();
    await new Promise((resolve) => setTimeout(resolve, 0)); //give the component time to refresh state
    actions.setRunning(name);
    await algo();
    actions.setRunning(undefined);
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Select
          id="guide-algo-select"
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
        <CodeEditor code={code} setCode={setCode} />
      </Col>
      <Col span={24}>
        <Button.Group style={{ width: "100%" }}>
          <Button
            id="guide-algo-run"
            style={{ width: "50%" }}
            icon={<RocketOutlined />}
            onClick={() => {
              runCode(code, "test");
              //runAlgorithm(selected.function, selected.value);
            }}
            loading={actions.running !== undefined}
          >
            Run
          </Button>
          <Button
            id="guide-algo-reset"
            style={{ width: "50%" }}
            icon={<UndoOutlined />}
            onClick={actions.resetGraph}
          >
            Reset
          </Button>
        </Button.Group>
      </Col>
    </Row>
  );
};

export default AlgoMenu;
