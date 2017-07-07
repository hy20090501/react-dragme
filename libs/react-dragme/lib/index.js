'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('./core.js');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragMe = function (_React$Component) {
    _inherits(DragMe, _React$Component);

    function DragMe(props) {
        _classCallCheck(this, DragMe);

        var _this2 = _possibleConstructorReturn(this, (DragMe.__proto__ || Object.getPrototypeOf(DragMe)).call(this, props));

        _this2.state = {
            dragList: {},
            dragContainerStyle: {
                minHeight: _this2.props.minHeight,
                height: _this2.props.height
            }
        };
        var _this = _this2;
        _this2.props.dragList.forEach(function (e) {
            var tempDragEle = _this.state.dragList[e.key] = e;
            tempDragEle.isDragging = false;
            tempDragEle.draggable ? (tempDragEle.zIndex = 9999, tempDragEle.cursor = "pointer") : tempDragEle.zIndex = 999;
        });
        _this2.handleMouseDown = _this2.handleMouseDown.bind(_this2);
        _this2.handleMouseMove = _this2.handleMouseMove.bind(_this2);
        _this2.handleMouseUp = _this2.handleMouseUp.bind(_this2);
        _this2.handleMouseLeave = _this2.handleMouseLeave.bind(_this2);
        return _this2;
    }

    //限制可拖拽边界,返回有效坐标


    _createClass(DragMe, [{
        key: 'getValidCoordinate',
        value: function getValidCoordinate(target, x, y) {
            //边界宽度和高度
            var areaWidth = target.parentNode.clientWidth;
            var areaHeight = target.parentNode.clientHeight;
            //拖曳元素宽度和高度
            var dragElementWidth = target.clientWidth;
            var dragElementHeight = target.clientHeight;
            if (x < 0) {
                x = 0;
            }
            if (y < 0) {
                y = 0;
            }
            if (x >= areaWidth - dragElementWidth) {
                x = areaWidth - dragElementWidth;
            }
            if (y > areaHeight - dragElementHeight) {
                y = areaHeight - dragElementHeight;
            }
            return { validX: x, validY: y };
        }
    }, {
        key: 'handleMouseDown',
        value: function handleMouseDown(event, key) {

            for (var i in this.state.dragList) {
                this.state.dragList[i].draggable ? this.state.dragList[i].zIndex = 9999 : null;
            }
            this.state.dragList[key] = Object.assign(this.state.dragList[key], {
                position: "absolute",
                isDragging: true,
                //记录鼠标按下时鼠标点击位置距离拖动元素左侧和顶部边框的距离
                oX: event.clientX - event.currentTarget.offsetLeft,
                oY: event.clientY - event.currentTarget.offsetTop,
                zIndex: 999999
            });
            this.setState({
                dragList: this.state.dragList
            });
        }
    }, {
        key: 'handleMouseMove',
        value: function handleMouseMove(event, key) {
            if (this.state.dragList[key].isDragging) {
                var currentX = event.clientX - this.state.dragList[key].oX;
                var currentY = event.clientY - this.state.dragList[key].oY;

                var _getValidCoordinate = this.getValidCoordinate(event.currentTarget, currentX, currentY),
                    validX = _getValidCoordinate.validX,
                    validY = _getValidCoordinate.validY;

                this.state.dragList[key] = Object.assign(this.state.dragList[key], {
                    isDragging: true,
                    x: validX + 'px',
                    y: validY + 'px'
                });
                this.setState({
                    dragList: this.state.dragList
                });
            }
        }
    }, {
        key: 'handleMouseUp',
        value: function handleMouseUp(event, key) {
            this.state.dragList[key] = Object.assign(this.state.dragList[key], {
                isDragging: false
            });
            this.setState({
                dragList: this.state.dragList
            });
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave(event, key) {
            this.state.dragList[key] = Object.assign(this.state.dragList[key], {
                isDragging: false
            });
            this.setState({
                dragList: this.state.dragList
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                _core2.default,
                { dragContainerStyle: this.state.dragContainerStyle },
                _react2.default.Children.map(this.props.children, function (child, index) {
                    var draggable = _this3.state.dragList[index + 1 + ""].draggable;
                    var cloneAddProps = null;
                    if (draggable) {
                        cloneAddProps = {
                            //把父组件的props.name赋值给每个子组件
                            // name: props.name
                            dragInfo: _this3.state.dragList[index + 1 + ""],
                            handleMouseDown: _this3.handleMouseDown,
                            handleMouseMove: _this3.handleMouseMove,
                            handleMouseUp: _this3.handleMouseUp,
                            handleMouseLeave: _this3.handleMouseLeave
                        };
                    } else {
                        cloneAddProps = {
                            dragInfo: _this3.state.dragList[index + 1 + ""]
                        };
                    }
                    return _react2.default.cloneElement(child, cloneAddProps);
                })
            );
        }
    }]);

    return DragMe;
}(_react2.default.Component);

exports.default = DragMe;

DragMe.propTypes = {
    dragList: _react2.default.PropTypes.array,
    minHeight: _react2.default.PropTypes.string,
    height: _react2.default.PropTypes.string
};
DragMe.defaultProps = {
    dragList: [],
    minHeight: "600px",
    height: "600px"
};