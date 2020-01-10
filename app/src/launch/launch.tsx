import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Form, Modal, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import action from '../data/action';
import File from '../util/file';
import Util from '../util/util';
import './launch.less';

/**
 * @file 启动屏
 */

type OwnProps = {
  onHide: Function;
};

type LaunchProps = {
  onHide: Function;
  initProjectAction?: Function;
  initFileAction?: Function;
  project?: any;
};

const itemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

class Launch extends React.Component<LaunchProps & FormComponentProps, any> {
  /**
   * 设置 document title
   */
  setTitle(path: string) {
    document.title = path;
  }

  hideLaunch = () => {
    this.props.onHide();
  };

  /**
   * 表单提交
   */
  submitHandle = (e) => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFields((err, project) => {
      if (err) {
        return;
      }

      if (!File.exist(project.path)) {
        return Modal.error({ title: '不是有效的项目路径' });
      }

      this.save(project);
    });
  };

  /**
   * 选择项目路径
   */
  selectHandle = (e) => {
    e.preventDefault();
    const { form } = this.props;

    File.selectPath().then((res) => {
      if (res.filePaths.length) {
        form.setFieldsValue({ path: res.filePaths[0] });
      }
    });
    e.target.blur();
  };

  /**
   * 根据 project 信息初始化文件系统
   */
  save(data: any) {
    const { initProjectAction, initFileAction } = this.props;

    const res = File.writeConfig(data);
    const path = data.path;

    if (res.code != -1) {
      initProjectAction(data);
      initFileAction(path);
      this.setTitle(path);
      this.hideLaunch();
    } else {
      Modal.error({
        title: '写入 local 数据失败',
        content: res.msg
      });
    }
  }

  render() {
    const {
      form: { getFieldDecorator },
      project
    } = this.props;

    project && this.setTitle(project.path);
    return (
      <Layout className='mf-launch'>
        <Layout className='mf-launch-layout'>
          <h2>
            <img src={Util.getFilePath('/assets/img/dock.png')} />
            Init Your Project
          </h2>
          <Form {...itemLayout} onSubmit={this.submitHandle} className='mf-form'>
            <Form.Item label='项目路径'>
              {getFieldDecorator('path', {
                rules: [{ required: true, message: 'Please input project path' }],
                initialValue: project && project.path
              })(<Input size='default' placeholder='project absolute path' onMouseDown={this.selectHandle} />)}
            </Form.Item>
            <Form.Item label='项目名称'>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input project name' }],
                initialValue: project && project.name
              })(<Input placeholder='project name' />)}
            </Form.Item>
            <Form.Item label='平台服务'>
              {getFieldDecorator('deploy', {
                rules: [{ required: true, message: 'Please input deploy server' }],
                initialValue: project && project.deploy
              })(<Input placeholder='deploy server' />)}
            </Form.Item>
            <div>
              <Button type='primary' className='mf-form-cancel' onClick={this.hideLaunch}>
                cancel
              </Button>
              <Button type='primary' className='mf-form-save' htmlType='submit'>
                save
              </Button>
            </div>
          </Form>
        </Layout>
      </Layout>
    );
  }
}

const FormLaunch = Form.create()(Launch);
const mapStateToProps = (state, ownProps: OwnProps) => {
  return {
    project: state.project,
    onHide: ownProps.onHide
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initProjectAction: bindActionCreators(action.initProject, dispatch),
    initFileAction: bindActionCreators(action.initFile, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLaunch);
