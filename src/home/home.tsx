import * as React from 'react';
import { Layout, Tree } from 'antd';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Operate from '../component/operate';
import FileIcon from '../component/fileCion';
import Code from '../component/code';
import Status from '../component/status';
import Util from '../util/util';
import './home.less';

/**
 * @file 控制台主窗口
 */

const { Footer, Sider, Content } = Layout;
const mapStateToProps = state => {
  return {
    project: state.project,
    file: state.file
  };
};

class Home extends React.Component<any, any> {
  static getDerivedStateFromProps(props, state) {
    return {
      select: state.select || props.file.entry
    };
  }

  constructor(props) {
    super(props);

    const win = Util.getLocalWin();
    win && win.setSize(1600, 1000);
  }

  state = {
    select: null
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
    const { select } = this.state;
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
              <Operate path={project.path} />
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
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(Home);
