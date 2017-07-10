"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragCore = function (_React$Component) {
    _inherits(DragCore, _React$Component);

    function DragCore(props) {
        _classCallCheck(this, DragCore);

        return _possibleConstructorReturn(this, (DragCore.__proto__ || Object.getPrototypeOf(DragCore)).call(this, props));
    }

    _createClass(DragCore, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "dragContainer",
                    style: this.props.dragContainerStyle
                },
                _react2.default.Children.map(this.props.children, function (child) {
                    var childProps = child.props;
                    // console.log('***************************')
                    // console.log(childProps)
                    if (childProps.dragInfo.draggable) {
                        return _react2.default.createElement(
                            "div",
                            { className: "draggable",
                                style: {
                                    position: "absolute",
                                    left: childProps.dragInfo.x,
                                    top: childProps.dragInfo.y,
                                    zIndex: childProps.dragInfo.zIndex,
                                    cursor: childProps.dragInfo.cursor
                                    //transform: childProps.dragInfo.transform
                                },
                                onMouseDown: function onMouseDown(e, key) {
                                    return childProps.handleMouseDown(e, childProps.dragInfo.key);
                                },
                                onMouseMove: function onMouseMove(e, key) {
                                    return childProps.handleMouseMove(e, childProps.dragInfo.key);
                                },
                                onMouseUp: function onMouseUp(e, key) {
                                    return childProps.handleMouseUp(e, childProps.dragInfo.key);
                                },
                                onMouseLeave: function onMouseLeave(e, key) {
                                    return childProps.handleMouseLeave(e, childProps.dragInfo.key);
                                }
                            },
                            child
                        );
                    } else {
                        return _react2.default.createElement(
                            "div",
                            { className: "commonElement",
                                style: {
                                    position: "absolute",
                                    left: childProps.dragInfo.x,
                                    top: childProps.dragInfo.y,
                                    //transform: childProps.dragInfo.transform,
                                    zIndex: childProps.dragInfo.zIndex
                                }
                            },
                            child
                        );
                    }
                })
            );
        }
    }]);

    return DragCore;
}(_react2.default.Component);

exports.default = DragCore;

DragCore.propTypes = {
    dragContainerStyle: _react2.default.PropTypes.object
};
DragCore.defaultProps = {
    dragContainerStyle: {}
};