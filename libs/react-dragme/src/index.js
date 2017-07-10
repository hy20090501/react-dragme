import React from 'react';
import DragCore from './core.js';

export default class DragMe extends React.Component {
   
    constructor(props) { 
        super(props);  
        this.state = { 
            dragList: {},
            dragContainerStyle : {
                minHeight: this.props.minHeight,
                height: this.props.height
            }
        }; 
        let _this = this;
        this.props.dragList.forEach(function(e){
            let tempDragEle = _this.state.dragList[e.key] = e;
            tempDragEle.isDragging = false;
            tempDragEle.transform = 'translate(' + tempDragEle.x + 'px' + ',' + tempDragEle.y + 'px)'
            tempDragEle.draggable ? (tempDragEle.zIndex = 9999,tempDragEle.cursor = "pointer") : tempDragEle.zIndex = 999
        });
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    } 

    //限制可拖拽边界,返回有效坐标
    getValidCoordinate(target, x, y) {
        //边界宽度和高度
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
        if(y >= (areaHeight-dragElementHeight)) {
            y = (areaHeight-dragElementHeight)
        }
        return { validX: x, validY: y }
    }

    handleMouseDown(event, key) { 
        for(var i in this.state.dragList) {
            this.state.dragList[i].draggable ? this.state.dragList[i].zIndex = 9999 : null;
        }
        this.state.dragList[key]  = Object.assign(this.state.dragList[key], {
            position: "absolute",
            isDragging: true,
            //记录鼠标按下时鼠标点击位置距离拖动元素左侧和顶部边框的距离
            oX: event.clientX - event.currentTarget.offsetLeft,
            oY: event.clientY - event.currentTarget.offsetTop,
            zIndex: 999999
        })
        this.setState({
            dragList: this.state.dragList
        })
    }

    handleMouseMove(event, key) { 
        if(this.state.dragList[key].isDragging){
            let currentX = event.clientX - this.state.dragList[key].oX;
            let currentY = event.clientY - this.state.dragList[key].oY;
            let { validX, validY } = this.getValidCoordinate(event.currentTarget, currentX, currentY);
            console.log('validX: ' + validX);
            this.state.dragList[key]  = Object.assign(this.state.dragList[key], {
                isDragging: true,
                x: validX + 'px',
                y: validY + 'px'//,
                //transform: 'translate(' + validX + 'px' + ',' + validY + 'px)'
            })
            this.setState({
                dragList: this.state.dragList
            })
        }
    }

    handleMouseUp(event, key) { 
        this.state.dragList[key]  = Object.assign(this.state.dragList[key], {
            isDragging: false
        })
        this.setState({
            dragList: this.state.dragList
        })
    }

    handleMouseLeave(event, key) { 
        this.state.dragList[key] = Object.assign(this.state.dragList[key], {
            isDragging: false
        })
        this.setState({
            dragList: this.state.dragList
        })
    }

    render() {
        return (
                <DragCore dragContainerStyle={ this.state.dragContainerStyle }>
                    {
                        React.Children.map(this.props.children, (child,index) => {
                            let draggable = this.state.dragList[index+1 +""].draggable;
                            let cloneAddProps = null;
                            if(draggable) {
                                cloneAddProps = {
                                    //把父组件的props.name赋值给每个子组件
                                    // name: props.name
                                    dragInfo: this.state.dragList[index+1+""],
                                    handleMouseDown: this.handleMouseDown,
                                    handleMouseMove: this.handleMouseMove,
                                    handleMouseUp: this.handleMouseUp,
                                    handleMouseLeave: this.handleMouseLeave
                                }
                            } else {
                                cloneAddProps = {
                                    dragInfo: this.state.dragList[index+1+""],
                                }
                            }
                            return React.cloneElement(child, cloneAddProps)
                        })
                    }
                </DragCore>
        );
    }
}
DragMe.propTypes = { 
    dragList: React.PropTypes.array,
    minHeight: React.PropTypes.string,
    height: React.PropTypes.string,
}; 
DragMe.defaultProps = { 
    dragList: [],
    minHeight: "600px",
    height: "600px",
};