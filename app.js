import React from 'react'
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import DragMe from './libs/drag';
// import DragElement from './src/btn';


class App extends React.Component {
  render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px'}}>
                <div style={{ background: '#fff', padding: 24, minHeight: 800 }}>
                    <DragMe minHeight="800px" {...dragHandlers}>
                        <span>drag me  1..</span>
                        <span>drag me  2..</span>
                    </DragMe>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
            </Footer>
        </Layout>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('content'));