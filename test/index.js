import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class MyContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 2,
            temp: 'temp'
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
        // console.log('rerender')
        // console.log(this.state)
        const childrenWithProps = React.Children.map(this.props.children, child => React.cloneElement(child, 
            {
                baseInfo: "parentInfo",
                parentState: this.state.count,
                handleClick: this.handleClick
            }
        ));
        return (
            <div>
                <h1>我是父亲容器</h1>
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
        // console.log(this.props)
        return <div onClick={ () => this.props.handleClick() }>
            子元素:{this.props.subInfo}<br/>
            {this.props.baseInfo}
            <br/>
            parent state count: { this.props.parentState }
        </div>
    }
}
ReactDOM.render(
    (
        <MyContainer >
            <MySub subInfo={"1"}/>
            <MySub subInfo={"2"}/>
        </MyContainer>
    )
    , document.getElementById('content'))