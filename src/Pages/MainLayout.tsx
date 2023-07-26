import "antd";
import React, { useState } from "react";
import PieChartOutlined, { DesktopOutlined } from "@ant-design/icons";
import { Card, Layout, Menu, MenuProps } from "antd";
const { Header, Sider, Content } = Layout;

interface Props {
  children?: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ zIndex: 10, height: 55 }}>
        <div className="main-logo">
          <img
            style={{ position: "relative", top: 10 }}
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
