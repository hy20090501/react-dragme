import React from 'react';
// import { Button } from 'antd';
import DragCore from './core';

export default class DragMe extends React.Component {
   
    constructor(props) { 
        super(props);  
        this.state = { 
            dragList: {
                "1": {
                    key: "1",
                    position: "relative",
                    isDrag: false,
                    x: 0,
                    y: 0,
                    currentX: 0,
                    currentY: 0
                },
                "2": {
                    key: "2",
                    position: "relative",
                    isDrag: false,
                    x: 0,
                    y: 0,
                    currentX: 0,
                    currentY: 0
                }
            }
        }; 
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    } 

    //限制可拖拽边界,返回有效坐标
    getValidCoordinate(target, x, y) {
        //边界宽度和高度
        // let areaWidth = this.refs.dragContainer.clientWidth;
        // let areaHeight = this.refs.dragContainer.clientHeight;
        let areaWidth = target.parentNode.clientWidth;
        let areaHeight = target.parentNode.clientHeight;
        //拖曳元素宽度和高度
        let dragElementWidth = target.clientWidth;
        let dragElementHeight = target.clientHeight;
        if(x < 0) {
            x = 0
        }
        if(y < 0) {
            y = 0;
        }
        if(x >= (areaWidth-dragElementWidth)) {
            x = (areaWidth-dragElementWidth)
        }
        if(y > (areaHeight-dragElementHeight)) {
            y = (areaHeight-dragElementHeight)
        }
        return { validX: x, validY: y }
    }

    handleMouseDown(event, key) { 
        // console.log('mouse down')
        // console.log(key)
        //console.log(this.state.dragInfo)
        //console.log('refs: ' + this.refs.dragContainer.clientLeft)
        //console.log('refs: ' + this.refs.dragContainer.clientTop)
        console.log('*****************')
        console.log(event.currentTarget.offsetWidth)
        this.state.dragList[key]  = Object.assign(this.state.dragList[key], {
            position: "absolute",
            isDrag: true,
            //记录鼠标按下时鼠标点击位置距离拖动元素左侧和顶部边框的距离
            oX: event.clientX - event.currentTarget.offsetLeft,
            oY: event.clientY - event.currentTarget.offsetTop
        })
        this.setState({
            dragList: this.state.dragList
        })
        // console.log(this.state.dragList)
    }

    handleMouseMove(event, key) { 
        // console.log('is dragging...')
        if(this.state.dragList[key].isDrag){
            // console.log("s drag processing...")
            let currentX = event.clientX - this.state.dragList[key].oX;
            let currentY = event.clientY - this.state.dragList[key].oY;
            let { validX, validY} = this.getValidCoordinate(event.currentTarget, currentX, currentY);

            this.state.dragList[key]  = Object.assign(this.state.dragList[key], {
                isDrag: true,
                currentX: validX + 'px',
                currentY: validY + 'px'
            })
            this.setState({
                dragList: this.state.dragList
            })
            // console.log(this.state.dragInfo) 
        }
    }

    handleMouseUp(event, key) { 
        this.state.dragList[key]  = Object.assign(this.state.dragList[key], {
            isDrag: false
        })
        this.setState({
            dragList: this.state.dragList
        })
        // console.log(this.dragInfo)
    }

    handleMouseLeave(event, key) { 
        // console.log('mouse leave...')
        this.state.dragList[key]  = Object.assign(this.state.dragList[key], {
            isDrag: false
        })
        this.setState({
            dragList: this.state.dragList
        })
        // console.log(this.dragList[this.dragInfo.key])
    }

    render() {
        // console.log(this.props)
        // console.log(this.state)
        return (
                <DragCore>
                    {
                        React.Children.map(this.props.children, (child,index) => {
                            console.log(this.state)
                            console.log(child)
                            return React.cloneElement(child, {
                                //把父组件的props.name赋值给每个子组件
                                // name: props.name
                                dragInfo: this.state.dragList[index+1+""],
                                handleMouseDown: this.handleMouseDown,
                                handleMouseMove: this.handleMouseMove,
                                handleMouseUp: this.handleMouseUp,
                                handleMouseLeave: this.handleMouseLeave
                            })
                        })
                    }
                </DragCore>
        );
    }
}
