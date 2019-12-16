import * as React from 'react';
import { Layout } from 'antd';
import { Form, Input, Tree } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import action from './action';
import './home.less';

/**
 * @file 控制台主窗口
 */

const { Header, Footer, Sider, Content } = Layout;
const mapStateToProps = state => {
  return {
    project: state.project,
    file: state.file
  };
};
const mapDispatchToProps = dispatch => {
  return {
    initProjectAction: bindActionCreators(action.initProject, dispatch),
    initFileAction: bindActionCreators(action.initFile, dispatch)
  };
};

class Home extends React.Component<any, any> {
  componentDidMount() {
    const { project, initFileAction } = this.props;

    initFileAction(project.path);
  }

  initHandle = val => {
    this.props.initProjectAction(val);
  };

  renderFileTree(list) {
    const { TreeNode } = Tree;

    return list.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderFileTree(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} dataRef={item} />;
    });
  }

  render() {
    const { project, file } = this.props;

    return (
      <Layout className="project-layout">
        <Header>
          <h1 className='header-title'>
            Mf-GUI<span>插件开发工具</span>
          </h1>
          <div className='header-project'>
            <label>输入项目地址</label>
            <Input.Search
              placeholder='absolute path'
              enterButton='确定'
              onSearch={this.initHandle}
              defaultValue={project.path}
            />
          </div>
        </Header>
        <Layout>
          <Sider>
            <div className="project-name">你的项目: {project.name}</div>
            <div className="project-filelist">
              {file.list ? <Tree defaultExpandAll>{this.renderFileTree(file.list)}</Tree> : null}
            </div>
          </Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
