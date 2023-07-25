import "antd";
import React, { useState } from "react";
import PieChartOutlined, { DesktopOutlined } from "@ant-design/icons";
import { Card, Layout, Menu, MenuProps } from "antd";
const { Header, Sider, Content } = Layout;

interface Props {
  children?: React.ReactNode;
}

const menuItems: MenuProps["items"] = [
  {
    label: "Main Page",
    key: "item1",
    icon: <DesktopOutlined />,
  },
  {
    label: "Desktop",
    key: "item2",
    icon: <DesktopOutlined />,
  },
  {
    label: "Another",
    key: "item3",
    icon: <DesktopOutlined />,
  },
];

const MainLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <div className="main-logo">
          <img
            style={{ position: "relative", top: 15 }}
            height={40}
            src="AutoGraph.svg"
          />
        </div>
      </Header>
      {/* 
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => {
            setCollapsed(value);
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
      </Layout> */}

      <Content>{children}</Content>
    </Layout>
  );
};

export default MainLayout;
