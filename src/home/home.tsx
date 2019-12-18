import * as React from 'react';
import { Layout } from 'antd';
import { Tree, Button, Modal, Progress } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import action from './action';
import ProjectSelect from '../component/projectSelect';
import FileIcon from '../component/fileCion';
import Code from '../component/code';
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
  state = {
    visible: false
  };

  componentDidMount() {
    const { project, initFileAction } = this.props;
    // 加载文件
    initFileAction(project.path);
  }

  initHandle = val => {
    this.props.initProjectAction(val);
  };

  deployHandle = () => {
    this.setState({ visible: true });
  };

  changeFileHandle = () => {};

  renderFileTree(list) {
    const { TreeNode } = Tree;

    return list.map(item => {
      if (item.children) {
        return (
          <TreeNode icon={<FileIcon file={item} />} title={item.title} key={item.key}>
            {this.renderFileTree(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode icon={<FileIcon file={item} />} key={item.key} title={item.title} />;
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
      <Layout className='mf-layout'>
        <Header>
          <h1 className='header-title'>
            Mf-GUI<span>插件开发工具</span>
          </h1>
          <ProjectSelect path={project.path} dispatch={this.onProjectChange} />
        </Header>
        <Layout>
          <Sider>
            <div className='mf-name'>你的项目: {project.name}</div>
            <div className='mf-filelist'>
              {fileList ? (
                <Tree key={Date.now()} defaultExpandedKeys={keys} showIcon={true} onSelect={this.changeFileHandle}>
                  {this.renderFileTree(file.list)}
                </Tree>
              ) : null}
            </div>
          </Sider>
          <Content>
            <Code path={file.entryFile} />
          </Content>
        </Layout>
        <Footer className='mf-build'>
          <Button type='danger' onClick={this.deployHandle}>
            部署
          </Button>
          <Button type='primary'>打包</Button>
        </Footer>
        <Modal
          title='项目部署中...'
          visible={this.state.visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}>
          <Progress type='circle' percent={75} />
        </Modal>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
