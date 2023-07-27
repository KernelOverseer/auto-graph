import {
  ArrowsAltOutlined,
  DeleteOutlined,
  DragOutlined,
  FlagOutlined,
  GithubOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  QuestionCircleFilled,
  QuestionCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  CollapseProps,
  Descriptions,
  Row,
  Tour,
  TourProps,
  Typography,
} from "antd";
import React, { useState } from "react";
import { actionProps } from "../interfaces/nodeData";
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
      <Col span="24" title="Mouse mode" id="guide-mouse-mode-select">
        <Button.Group>
          <Button
            id="guide-mouse-mode-move"
            icon={<DragOutlined />}
            type={actions.mode === "idle" ? "primary" : "default"}
            onClick={() => {
              actions.setMode("idle");
            }}
          >
            Move
          </Button>
          <Button
            id="guide-mouse-mode-link"
            icon={<ArrowsAltOutlined />}
            type={actions.mode === "link" ? "primary" : "default"}
            onClick={() => {
              actions.setMode("link");
            }}
          >
            Link
          </Button>
          <Button
            id="guide-mouse-mode-unlink"
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
          id="guide-node-create"
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
      <Col span="24" id="guide-node-start">
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
      <Col span="24" id="guide-node-end">
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
      <div id="guide-node-details">
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
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: "center", padding: 20 }} id="guide-node-details">
        <SmileOutlined style={{ fontSize: 20 }} />
        <p>Select a node</p>
      </div>
    );
  }
};

const OptionsMenu: React.FC<actionProps> = ({ actions }) => {
  const [active, setActive] = useState<string | string[]>(["1", "2", "3"]);
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
  ];

  return (
    <div style={floatingMenuStyle}>
      <Collapse
        items={menuItems}
        activeKey={active}
        onChange={(keys) => {
          setActive(keys);
        }}
      />
      <OptionsGuide
        openCollapse={() => {
          setActive(["1", "2", "3"]);
        }}
      />
      <Button
        icon={<GithubOutlined />}
        type="link"
        href="https://github.com/kerneloverseer/auto-graph"
        target="_blank"
      >
        Repository
      </Button>
    </div>
  );
};

//make it automatically open the collapse when clicking the guide button
const OptionsGuide: React.FC<{ openCollapse: () => void }> = ({
  openCollapse,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const steps = [
    {
      title: "Welcome to Auto-Graph",
      description:
        "Auto-graph allows users to interactively visualize and manipulate graphs using drag and drop interactions, providing an intuitive and engaging experience for graph exploration and analysis.",
    },
    {
      title: "Change Mouse Mode",
      description:
        "Here, you can select your preferred mouse mode for interacting with the application.",
      target: () => document.getElementById("guide-mouse-mode-select")!,
    },
    {
      title: "Move Nodes",
      description:
        "In this mode, you can easily drag and reposition nodes to your desired locations.",
      target: () => document.getElementById("guide-mouse-mode-move")!,
    },
    {
      title: "Link Nodes",
      description:
        "Select a node and then click on another node to create a link between them.",
      target: () => document.getElementById("guide-mouse-mode-link")!,
    },
    {
      title: "Unlink Nodes",
      description:
        "To remove a link between nodes, select a node, and then click on the second node in the link.",
      target: () => document.getElementById("guide-mouse-mode-unlink")!,
    },
    {
      title: "Create a New Node",
      description:
        "Click this button to effortlessly add a new node to the graph.",
      target: () => document.getElementById("guide-node-create")!,
    },
    {
      title: "Set Node as Starting Point",
      description:
        "Choose a node and use this button to set it as the starting point for pathfinding algorithms.",
      target: () => document.getElementById("guide-node-start")!,
    },
    {
      title: "Set Node as End Point",
      description:
        "Select a node and use this button to set it as the goal point for pathfinding algorithms.",
      target: () => document.getElementById("guide-node-end")!,
    },
    {
      title: "Node Details",
      description:
        "When you select a node, you can view its details, and edit the node's name as well as delete the node",
      target: () => document.getElementById("guide-node-details")!,
    },
    {
      title: "Select an Algorithm to Run",
      description:
        "Explore multiple algorithms and choose one to run on the graph.",
      target: () => document.getElementById("guide-algo-select")!,
    },
    {
      title: "Run the Algorithm",
      description:
        "Press this button to execute the selected algorithm and enjoy the visual representation.",
      target: () => document.getElementById("guide-algo-run")!,
    },
    {
      title: "Reset Nodes Status",
      description:
        "Reset all node and link flags by clicking this button, marking every node as not visited.",
      target: () => document.getElementById("guide-algo-reset")!,
    },
    {
      title: "Control algorithm execution",
      description:
        "The control bar allows you to set the animation speed, or you can pause the execution and advance step by step",
      target: () => document.getElementById("guide-control-bar")!,
    },
    {
      title: "Congratulations 🎉",
      description:
        "You are now ready to enjoy this tool fully, don't forget to support me by leaving a star on my github repo!",
    },
  ];

  return (
    <>
      <Button
        icon={<QuestionCircleOutlined />}
        type="link"
        onClick={() => {
          openCollapse();
          setOpen(true);
        }}
      >
        Guided tour
      </Button>
      <Tour
        open={open}
        steps={steps}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default OptionsMenu;
