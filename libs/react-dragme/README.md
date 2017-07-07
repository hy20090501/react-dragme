# react-dragme

A simple component for making elements draggable. it specifies a container and draggable elements could be only moved in this area.

```js
<DragMe { ...dragMeProps }>
    <span>drag me 1</span>
    <span>drag me 2</span>
    <div>stay here</div>
</DragMe>
```
------

#### Technical Documentation

- [Installing](#installing)
- [DragMe](#DragMe)


### Installing

```bash
$ npm install react-dragme
```

## `<DragMe>`

A `<DragMe>` element wraps an existing element and extends it with new styles.
It does not create a wrapper element in the DOM.

DragMe items are moved using CSS Transforms. This allows items to be dragged regardless of their current
positioning (relative, absolute, or static). Elements can also be moved between drags without incident.

If the item you are dragging already has a CSS Transform applied, it will be overwritten by `<DragMe>`. Use
an intermediate wrapper (`<DragMe><span>...</span></DragMe>`) in this case.

### DragMe Usage


```js
import React from 'react'
import ReactDOM from 'react-dom';
import { Layout, Menu } from 'antd';
// import DragMe from './libs/react-dragme/src/';
import DragMe from 'react-dragme';

const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            dragList: [
                {
                    key: "1",
                    x: 50,
                    y: 0,
                    draggable: true
                },
                {
                    key: "2",
                    x: 0,
                    y: 80,
                    draggable: true
                },
                {
                    key: "3",
                    x: 100,
                    y: 130,
                    draggable: false
                }
            ]
        }; 
    }
    handleClick() {
        console.log(this.state)
    }
    render() {
        const dragMeProps = { dragList: this.state.dragList, minHeight: "600px", height: "600px" };
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
                    <div style={{ background: '#fff', padding: 25 }}>
                        <DragMe { ...dragMeProps }>
                            <span 
                                style = {{
                                    display: "inline-block",
                                    color: "#666666",
                                    width: "60px",
                                    height: "30px",
                                    background: "yellow",
                                    lineHeight: "30px",
                                    textAlign: "center"
                                }}
                            >drag me 1</span>
                            <span 
                                style = {{
                                    display: "inline-block",
                                    color: "#666666",
                                    width: "60px",
                                    height: "30px",
                                    background: "yellow",
                                    lineHeight: "30px",
                                    textAlign: "center"
                                }}
                            >drag me 2</span>
                            <div
                                style = {{
                                    color: "#ffffff",
                                    width: "60px",
                                    height: "30px",
                                    background: "red",
                                    lineHeight: "30px",
                                    textAlign: "center"
                                }}
                            >stay here</div>
                        </DragMe>
                        <div onClick={ (e)=>this.handleClick(e) }>get state</div>
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

```

#### `<Draggable>` Props:

```
// 
// Types: 
// 
dragList: [
    {
        key: "1",
        x: 50,
        y: 0,
        draggable: true
    },
    {
        key: "2",
        x: 0,
        y: 80,
        draggable: true
    },
    {
        key: "3",
        x: 100,
        y: 130,
        draggable: false
    }
]
const dragMeProps = { dragList: this.state.dragList, minHeight: "600px", height: "600px" };

//
// Props:
//
{

//Specifies draggable container's min height
minHeight: string

//Specifies draggable container's height
height: string 

// If set to `true`, will allow current element being dragged anywhere in a area.It set to 'false', will not allow current element  being dragged anywhere.
draggable: boolean,

//Determines which axis the draggable can move
x:

//in react-dragme, every element's position is set 'absolute', x and y determines which axis the draggable can move
// - `x` limits movement to horizontal axis.
// - `y` limits movement to vertical axis.
x: number
y: number

```


