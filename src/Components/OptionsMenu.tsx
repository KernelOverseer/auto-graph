import {
  ArrowsAltOutlined,
  DeleteOutlined,
  DragOutlined,
  FlagOutlined,
  HomeOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
  PlusOutlined,
  ShareAltOutlined,
  SmileOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import {
  Affix,
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  CollapseProps,
  Descriptions,
  Row,
  Typography,
} from "antd";
import React from "react";
import { mouseModes, nodeActions } from "../interfaces/nodeActions";
import { actionProps } from "../interfaces/nodeData";
import { reorderGraph } from "../logic/algorithms";
import AlgoMenu from "./AlgoMenu";

const floatingMenuStyle = {
  position: "fixed",
  top: 80,
  right: 10,
  width: 300,
} as React.CSSProperties;

const ActionsMenu: React.FC<actionProps> = ({ actions }) => {
  function getNewNodeName(): string {
    let count = actions.nodes.length;
    while (actions.get(`node ${count}`) !== undefined) count++;
    return `node ${count}`;
  }

  return (
    <Row gutter={[10, 10]}>
      <Col span="24">
        <Typography.Text>Mouse mode</Typography.Text>
      </Col>
      <Col span="24" title="Mouse mode">
        <Button.Group>
          <Button
            icon={<DragOutlined />}
            type={actions.mode === "idle" ? "primary" : "default"}
            onClick={() => {
              actions.setMode("idle");
            }}
          >
            Move
          </Button>
          <Button
            icon={<ArrowsAltOutlined />}
            type={actions.mode === "link" ? "primary" : "default"}
            onClick={() => {
              actions.setMode("link");
            }}
          >
            Link
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type={actions.mode === "unlink" ? "primary" : "default"}
            onClick={() => {
              actions.setMode("unlink");
            }}
          >
            Unlink
          </Button>
        </Button.Group>
      </Col>
      <Col span="24">
        <Typography.Text>Creation</Typography.Text>
      </Col>
      <Col span="24">
        <Button
          icon={<PlusCircleOutlined />}
          onClick={() => {
            actions.add(getNewNodeName());
          }}
        >
          Add node
        </Button>
      </Col>
      <Col span="24">
        <Typography.Text>Traversal</Typography.Text>
      </Col>
      <Col span="24">
        <Button.Group>
          <Button
            style={{ width: 150 }}
            icon={<HomeOutlined />}
            onClick={() => {
              if (actions.selected !== undefined)
                actions.setStart(actions.selected);
            }}
          >
            Set node as start
          </Button>
          <Button style={{ width: 100 }} disabled>
            {actions.start}
          </Button>
        </Button.Group>
      </Col>
      <Col span="24">
        <Button.Group>
          <Button
            style={{ width: 150 }}
            icon={<FlagOutlined />}
            onClick={() => {
              if (actions.selected !== undefined)
                actions.setEnd(actions.selected);
            }}
          >
            Set node as end
          </Button>
          <Button style={{ width: 100 }} disabled>
            {actions.end}
          </Button>
        </Button.Group>
      </Col>
    </Row>
  );
};

const NodeOptions: React.FC<actionProps> = ({ actions }) => {
  if (actions.selected !== undefined) {
    const selectedNode = actions.get(actions.selected);
    return (
      <>
        <Descriptions size="small" layout="horizontal" column={2}>
          <Descriptions.Item label="ID">
            <Typography.Paragraph
              editable={{
                onChange: (newId) => {
                  actions.renameNode(actions.selected!, newId);
                },
                text: actions.selected!,
              }}
            >
              {selectedNode?.id}
            </Typography.Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="Visited">
            <Checkbox disabled checked={selectedNode?.visited === true} />
          </Descriptions.Item>
          <Descriptions.Item label="X">{selectedNode?.x}</Descriptions.Item>
          <Descriptions.Item label="Y">{selectedNode?.y}</Descriptions.Item>
        </Descriptions>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            actions.removeNode(actions.selected!);
          }}
        >
          Delete Node
        </Button>
      </>
    );
  } else {
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <SmileOutlined style={{ fontSize: 20 }} />
        <p>Select a node</p>
      </div>
    );
  }
};

const OptionsMenu: React.FC<actionProps> = ({ actions }) => {
  const menuItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "Actions",
      children: <ActionsMenu actions={actions} />,
    },
    {
      key: "2",
      label: "Options",
      children: <NodeOptions actions={actions} />,
    },
    {
      key: "3",
      label: "Algorithms",
      children: <AlgoMenu actions={actions} />,
    },
  ];

  return (
    <div style={floatingMenuStyle}>
      <Collapse items={menuItems} defaultActiveKey={["1", "2"]} />
    </div>
  );
};

export default OptionsMenu;
