import * as React from 'react';
import { Layout, Tree, Button, Modal, Progress, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import action from './action';
import ProjectSelect from '../component/projectSelect';
import FileIcon from '../component/fileCion';
import Code from '../component/code';
import Status from '../component/status';
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

  deployHandle = () => {
    this.setState({ visible: true });
  };

  changeFileHandle = () => {};

  changRouter = path => {
    this.props.history.replace(path);
  };

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

  render() {
    const { project, file } = this.props;
    const fileList = file.list;
    const keys = fileList && fileList.map(data => String(data.key));

    return (
      <Layout className='mf-home'>
        <Header className='mf-home-header'>
          <img src='./assets/logos/launch-logo.png' />
          MF-PLUGIN-TOOLS
          <ProjectSelect path={project.path} changeRouter={this.changRouter} />
        </Header>
        <Layout>
          <Sider>
            <div className='mf-name'>
              {project.name}
              <Button
                type='primary'
                size='small'
                icon='play-circle'
                onClick={this.deployHandle}>
                部署
              </Button>
            </div>
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
        <Footer className='mf-footer'>
          <Status path={file.entryFile} />
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
