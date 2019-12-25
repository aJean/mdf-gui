import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import action from '../home/action';
import { Layout, Form, Modal, Input, Button } from 'antd';
import FileTools from '../util/file';
import './launch.less';

/**
 * @file 启动屏
 */

const { Header } = Layout;
const { confirm, error } = Modal;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

class Launch extends React.Component<any, any> {
  submitHandle = e => {
    e.preventDefault();
    const { form, initProjectAction, history } = this.props;

    form.validateFields((err, project) => {
      if (err) {
        return;
      }

      const data = FileTools.writeConfig(JSON.stringify(project))
      if (data.code != -1) {
        initProjectAction(project);
        confirm({
          title: '将要进入工作台',
          content: '可以在工作台管理项目资源以及编辑代码',
          onOk() {
            history.replace('/app');
          }
        });
      } else {
        error({
          title: '写入 local 数据失败',
          content: data.msg,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      project
    } = this.props;

    return (
      <Layout className='mf-launch'>
        <Helmet>
          <title>mf-gui</title>
        </Helmet>
        <Header className='mf-launch-header'>
          MF-PLUGIN-TOOLS
        </Header>
        <Layout className='mf-launch-layout'>
          <h2>填写项目信息</h2>
          <Form {...formItemLayout} onSubmit={this.submitHandle} className='mf-form'>
            <Form.Item label='项目路径'>
              {getFieldDecorator('path', {
                rules: [{ required: true, message: 'Please input project path' }],
                initialValue: project && project.path
              })(<Input size='default' placeholder='project absolute path' />)}
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
              <Button type='primary' htmlType='submit'>
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
const mapStateToProps = state => {
  return {
    project: state.project
  };
};
const mapDispatchToProps = dispatch => {
  return {
    initProjectAction: bindActionCreators(action.initProject, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLaunch);
