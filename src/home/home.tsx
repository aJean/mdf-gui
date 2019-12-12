import * as React from 'react';
import { Layout } from 'antd';
import './home.less';

/**
 * @file 控制台主窗口
 */

const { Header, Footer, Sider, Content } = Layout;
export default class Home extends React.Component {
  render() {
    return (
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}
