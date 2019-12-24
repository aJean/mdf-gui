import * as React from 'react';
import { Layout, Tree, Button, Modal, Progress, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
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
  static getDerivedStateFromProps(props, state) {
    return {
      visible: state.visible,
      select: state.select || props.file.entry
    };
  }

  state = {
    visible: false,
    select: null
  };

  componentDidMount() {
    const { project, initFileAction } = this.props;
    // 加载文件
    initFileAction(project.path);
  }

  deployHandle = () => {
    this.setState({ visible: true });
  };

  /**
   * 选择文件更新 ide
   */
  changeFileHandle = keys => {
    const { file } = this.props;
    const key = keys[0];

    if (key) {
      this.setState({ select: file.map[key] });
    }
  };

  /**
   * 窗口切换
   */
  changRouter = path => {
    this.props.history.replace(path);
  };

  /**
   * 渲染资源管理树
   */
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
    const { visible, select } = this.state;
    const fileList = file.list;
    const keys = fileList && fileList.map(data => data.key);
    const skeys = select ? [select.key] : ['0'];

    return (
      <Layout className='mf-home'>
        <Helmet>
          <title>project - {project.path}</title>
        </Helmet>
        <Layout>
          <Sider width='300'>
            <div className='mf-info'>
              <ProjectSelect path={project.path} changeRouter={this.changRouter} />
              <Button type='primary' size='small' icon='play-circle' onClick={this.deployHandle}>
                部署
              </Button>
              <Button type='primary' size='small' icon='play-circle' onClick={this.deployHandle}>
                构建
              </Button>
            </div>
            <div className='mf-filelist'>
              {fileList ? (
                <Tree
                  key={Date.now()}
                  defaultSelectedKeys={skeys}
                  defaultExpandedKeys={keys}
                  showIcon={true}
                  onSelect={this.changeFileHandle}>
                  {this.renderFileTree(fileList)}
                </Tree>
              ) : null}
            </div>
          </Sider>
          <Content>
            <Code file={select} />
          </Content>
        </Layout>
        <Footer className='mf-footer'>
          <Status project={project} file={select} />
        </Footer>
        <Modal
          title='项目部署中...'
          visible={visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}>
          <Progress type='circle' percent={75} />
        </Modal>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
