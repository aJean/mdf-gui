import * as React from 'react';
import { Layout } from 'antd';
import './home.less';
import FileTools from '../util/file';

/**
 * @file 控制台主窗口
 */

const { Header, Footer, Sider, Content } = Layout;
export default class Home extends React.Component {
  componentDidMount() {
    console.log(FileTools.find());
  }

  render() {
    return (
      <Layout>
        <Header>
          <h1 className="header-title">Mf-GUI<span>插件开发工具</span></h1>
        </Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}
