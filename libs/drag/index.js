import React from 'react';
// import { Button } from 'antd';


export default class DragCore extends React.Component {
   
    constructor(props) { 
        super(props);  
        this.state = { 
            // timer: null,
            dragInfo: {
                position: "relative",
                isDrag: false,
                x: 0,
                y: 0,
                currentX: 0,
                currentY: 0
            }
        }; 
    } 
    static propTypes = {
        height: React.PropTypes.string 
    }
    
    static defaultProps = {
        height: '600px' 
    }
    componentWillMount() {
        
    }

    //限制可拖拽边界,返回有效坐标
    getValidCoordinate(target, x, y) {
        //边界宽度和高度
        let areaWidth = this.refs.dragContainer.clientWidth;
        let areaHeight = this.refs.dragContainer.clientHeight;
        // let areaWidth = target.parentNode.clientWidth;
        // let areaHeight = target.parentNode.clientHeight;
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

    handleMouseDown(event) { 
        //console.log('mouse down')
        //console.log(this.state.dragInfo)
        //console.log('refs: ' + this.refs.dragContainer.clientLeft)
        //console.log('refs: ' + this.refs.dragContainer.clientTop)
        this.setState({ 
            dragInfo: Object.assign(this.state.dragInfo,{
                position: "absolute",
                isDrag: true,
                //记录鼠标按下时鼠标点击位置距离拖动元素左侧和顶部边框的距离
                // oX: event.clientX - (event.target.offsetLeft + this.refs.dragContainer.clientLeft),
                // oY: event.clientY - (event.target.offsetTop + this.refs.dragContainer.clientTop)
                oX: event.clientX - event.target.offsetLeft,
                oY: event.clientY - event.target.offsetTop
            })
        }); 
        //console.log(this.state.dragInfo)
    }
    handleMouseMove(event) { 
        // console.log('is dragging...')
        if(this.state.dragInfo.isDrag){
            // this.state.timer && clearTimeout(this.state.timer);
            var _this = this;
            //this.state.timer = setTimeout(function(){
                // console.log("s drag processing...")
                let currentX = event.clientX - _this.state.dragInfo.oX;
                let currentY = event.clientY - _this.state.dragInfo.oY;
                let { validX, validY} = this.getValidCoordinate(event.target, currentX, currentY);
                _this.setState({ 
                    dragInfo: Object.assign(_this.state.dragInfo,{
                        isDrag: _this,
                        currentX: validX + 'px',
                        currentY: validY + 'px'
                    })
                });
                // console.log(_this.state.dragInfo) 
            //},500);
        }
    }
    handleMouseUp(event) { 
        //console.log('mouse up...')
        this.setState({ 
            dragInfo: Object.assign(this.state.dragInfo,{
                isDrag: false,
            })
        }); 
        console.log(this.state.dragInfo)
    }

    handleMouseLeave(event) { 
        console.log('mouse leave...')
        this.setState({ 
            dragInfo: Object.assign(this.state.dragInfo,{
                isDrag: false,
            })
        }); 
        console.log(this.state.dragInfo)
    }
    render() {
        return (
            <div className="dragContainer" 
                 style={{ 
                     height: this.props.height, 
                     minHeight: this.props.minHeight, 
                 }} 
                 ref="dragContainer"
            >
                <div className="draggable" 
                    onMouseDown={(e)=>this.handleMouseDown(e)}
                    onMouseMove={(e)=>this.handleMouseMove(e)}
                    onMouseUp={(e)=>this.handleMouseUp(e)}
                    onMouseLeave={(e)=>this.handleMouseLeave(e)}
                    style={{
                        position: this.state.dragInfo.position, 
                        left: this.state.dragInfo.currentX,
                        top: this.state.dragInfo.currentY,
                        color: "#666666",
                        width: "60px",
                        height: "30px",
                        background: "yellow",
                        lineHeight: "30px",
                        textAlign: "center",
                        cursor: "pointer"
                    }}
                >drag me</div>
            </div>
        );
    }
}
