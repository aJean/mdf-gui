import * as React from 'react';
import { Layout } from 'antd';
import { Tree, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import action from './action';
import ProjectSelect from '../component/projectSelect';
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
          <TreeNode icon={<Icon />} title={item.title} key={item.key} dataRef={item}>
            {this.renderFileTree(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode icon={<Icon />} key={item.key} {...item} dataRef={item} />;
    });
  }

  /**
   * 项目切换
   */
  onProjectChange = project => {
    const { initFileAction, initProjectAction } = this.props;
    initProjectAction(project);
    initFileAction(project.path);
  };

  render() {
    const { project, file } = this.props;
    const fileList = file.list;
    const keys = fileList && fileList.map(data => String(data.key));

    return (
      <Layout className='project-layout'>
        <Header>
          <h1 className='header-title'>
            Mf-GUI<span>插件开发工具</span>
          </h1>
          <ProjectSelect path={project.path} dispatch={this.onProjectChange} />
        </Header>
        <Layout>
          <Sider>
            <div className='project-name'>你的项目: {project.name}</div>
            <div className='project-filelist'>
              {fileList ? <Tree expandedKeys={keys} showIcon>{this.renderFileTree(file.list)}</Tree> : null}
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
