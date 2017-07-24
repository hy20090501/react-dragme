import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import DragMe from '../../src/index';

describe('root', function () {
  it('renders without problems', function () {
    var root = TestUtils.renderIntoDocument(<DragMe/>);
    expect(root).toExist();
  });

  it('renders with props passed', function () {
      let dragList = [
            {
                key: "1",
                x: 50,
                y: 50,
                draggable: true
            },
            {
                key: "2",
                x: 0,
                y: 80,
                draggable: false
            },
            {
                key: "3",
                x: 100,
                y: 130,
                draggable: false
            }
        ];
      let dragMeProps = { dragList: dragList, minHeight: "600px", height: "600px" };
      var app = TestUtils.renderIntoDocument(<DragMe { ...dragMeProps }>
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
                    </DragMe>);
  });

  it('mock elements be dragged', function () {
      let dragList = [
            {
                key: "1",
                x: 50,
                y: 50,
                draggable: true
            },
            {
                key: "2",
                x: 0,
                y: 80,
                draggable: false
            },
            {
                key: "3",
                x: 100,
                y: 130,
                draggable: false
            }
        ];
      let dragMeProps = { dragList: dragList, minHeight: "600px", height: "600px" };
      var app = TestUtils.renderIntoDocument(<DragMe { ...dragMeProps }>
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
                    </DragMe>);
      TestUtils.Simulate.mouseDown(TestUtils.findRenderedDOMComponentWithClass(app,"draggable"), {key: "1"});
      TestUtils.Simulate.mouseUp(TestUtils.findRenderedDOMComponentWithClass(app,"draggable"), {key: "1"});
      TestUtils.Simulate.mouseLeave(TestUtils.findRenderedDOMComponentWithClass(app,"draggable"), {key: "1"});
      TestUtils.Simulate.mouseMove(TestUtils.findRenderedDOMComponentWithClass(app,"draggable"), {key: "1"});
      // var dice = expect.createSpy().andCall(function () {
      //   TestUtils.Simulate.mouseMove(TestUtils.findRenderedDOMComponentWithClass(app,"draggable"), {key: "1"});
      // })
      // function createSpy() {
      //   TestUtils.Simulate.mouseDown(TestUtils.findRenderedDOMComponentWithClass(app,"draggable"), {key: "1"});
      // }
  });
});
