import React from 'react';
// import { Button } from 'antd';


export default class DragCore extends React.Component {
   
    constructor(props) { 
        super(props);  
    } 
    static propTypes = {
        height: React.PropTypes.string 
    }
    
    static defaultProps = {
        height: '600px' 
    }

    render() {
        // console.log(this.props)
        return (
            <div className="dragContainer" 
                 style={{
                     height: "600px"
                 }}
            >
                {
                    React.Children.map(this.props.children, child => {
                        let childProps = child.props;
                        // console.log('**************')
                        // console.log(childProps)
                        return  <div className="draggable"
                                    style={{
                                        position: childProps.dragInfo.position, 
                                        left: childProps.dragInfo.currentX,
                                        top: childProps.dragInfo.currentY,
                                        color: "#666666",
                                        width: "60px",
                                        height: "30px",
                                        background: "yellow",
                                        lineHeight: "30px",
                                        textAlign: "center",
                                        cursor: "pointer"
                                    }}
                                    onMouseDown={(e,key)=>childProps.handleMouseDown(e,childProps.dragInfo.key)}
                                    onMouseMove={(e,key)=>childProps.handleMouseMove(e,childProps.dragInfo.key)}
                                    onMouseUp={(e,key)=>childProps.handleMouseUp(e,childProps.dragInfo.key)}
                                    onMouseLeave={(e,key)=>childProps.handleMouseLeave(e,childProps.dragInfo.key)}
                                >
                                    { child }
                                </div>
                    })
                }
            </div>
        );
    }
}