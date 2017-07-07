import React from 'react';

export default class DragCore extends React.Component {
   
    constructor(props) { 
        super(props);  
    } 

    render() {
        return (
            <div className="dragContainer" 
                 style={this.props.dragContainerStyle}
            >
                {
                    React.Children.map(this.props.children, child => {
                        let childProps = child.props;
                        if(childProps.dragInfo.draggable) {
                            return  <div className="draggable"
                                    style={{
                                        position: "absolute", 
                                        left: childProps.dragInfo.x,
                                        top: childProps.dragInfo.y,
                                        zIndex: childProps.dragInfo.zIndex,
                                        cursor: childProps.dragInfo.cursor
                                    }}
                                    onMouseDown={(e,key)=>childProps.handleMouseDown(e,childProps.dragInfo.key)}
                                    onMouseMove={(e,key)=>childProps.handleMouseMove(e,childProps.dragInfo.key)}
                                    onMouseUp={(e,key)=>childProps.handleMouseUp(e,childProps.dragInfo.key)}
                                    onMouseLeave={(e,key)=>childProps.handleMouseLeave(e,childProps.dragInfo.key)}
                                >
                                    { child }
                                </div>
                        } else {
                            return  <div className="commonElement"
                                    style={{
                                        position: "absolute", 
                                        left: childProps.dragInfo.x,
                                        top: childProps.dragInfo.y,
                                        zIndex: childProps.dragInfo.zIndex
                                    }}
                                >
                                    { child }
                                </div>
                        }
                    })
                }
            </div>
        );
    }
}
DragCore.propTypes = { 
    dragContainerStyle: React.PropTypes.object 
}; 
DragCore.defaultProps = { 
    dragContainerStyle: {} 
};