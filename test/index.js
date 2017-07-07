import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MyContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.state.count++;
        this.setState({
            count: this.state.count++
        })
        console.log(this.state)
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children, child => {
                return React.cloneElement(child, {
                    parentState: this.state.count,
                    handleClick: this.handleClick
                })
            }
        );
        return (
            <div style={{border:"1px solid blue"}}>
                <span>父容器:</span>
                { childrenWithProps }
            </div>
        )
    }
}
class MySub extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: false
        }
    }

    render() {
        return (
            <div style={{margin: "15px", border: "1px solid red"}}>
                子元素:{this.props.subInfo}
                <br/>
                父组件属性count值: { this.props.parentState }
                <br/>
                <span onClick={ () => this.props.handleClick() } 
                      style={{display:"inline-block",padding: "3px 5px", color:"#ffffff", background: "green", borderRadius: "3px", cursor: "pointer"}} 
                >click me</span>
            </div>
        )
    }
}
ReactDOM.render (
    (
        <MyContainer>
            <MySub subInfo={"1"}/>
            <MySub subInfo={"2"}/>
        </MyContainer>
    )
    , document.getElementById('content'))