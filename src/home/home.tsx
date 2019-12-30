import * as React from 'react';
import { Layout, Tree } from 'antd';
import { connect } from 'react-redux';
import Operate from '../component/operate';
import FileIcon from '../component/fileCion';
import Code from '../component/code';
import Status from '../component/status';
import MfMenu from '../component/menu';
import Util from '../util/util';
import File from '../util/file';
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
    // props 引发更新，这里的 state 是 prevState
    const last = state.file;
    const next = props.file;

    return {
      file: props.file,
      select: last != next ? next.entry : state.select,
      expandKeys: state.expandKeys
    };
  }

  constructor(props) {
    super(props);

    const win = Util.getLocalWin();
    win && win.setSize(1600, 1000);
  }

  state = {
    select: null,
    file: null,
    expandKeys: ['root']
  };

  /**
   * 选择文件更新 ide
   */
  changeFileHandle = keys => {
    const { project, file } = this.props;
    const select = file.map[keys[0]];
    const code: any = this.refs.code;
    const status: any = this.refs.status;

    if (select && select.type == 'file') {
      // 将选中文件写入配置
      File.writeConfig({ ...project, entry: select.path });
      code.acceptFile(select);
      status.acceptFile(select);
    }
  };

  /**
   * 记录展开的 keys
   */
  setExpandHandle = keys => {
    this.state.expandKeys = keys;
  };

  /**
   * 渲染资源管理树
   */
  generateTree(list) {
    const { TreeNode } = Tree;

    return list.map(item => {
      const customTitle = <span data-path={item.path}>{item.title}</span>;

      if (item.children) {
        return (
          <TreeNode icon={<FileIcon file={item} />} title={customTitle} key={item.key}>
            {this.generateTree(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode icon={<FileIcon file={item} />} key={item.key} title={customTitle} />;
    });
  }

  render() {
    const { project, file } = this.props;
    const { select, expandKeys } = this.state;
    const fileList = file.list;
    const keys = expandKeys;

    return (
      <Layout className='mf-home'>
        <Layout>
          <Sider width='300'>
            <div className='mf-info'>
              <Operate project={project} />
            </div>
            <MfMenu>
              <div className='mf-filelist'>
                {fileList ? (
                  <Tree
                    key={Date.now()}
                    defaultExpandedKeys={keys}
                    defaultSelectedKeys={[select && select.key]}
                    showIcon={true}
                    onSelect={this.changeFileHandle}
                    onExpand={this.setExpandHandle}>
                    {this.generateTree(fileList)}
                  </Tree>
                ) : null}
              </div>
            </MfMenu>
          </Sider>
          <Content>
            <Code ref='code' file={select} />
          </Content>
        </Layout>
        <Footer className='mf-footer'>
          <Status ref="status" project={project} file={select} />
        </Footer>
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(Home);
