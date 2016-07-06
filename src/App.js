import React, { Component } from 'react';
// import RichEditor from './components/Editor';
import Canvas from './components/canvas';
import LS from './utils/LocalStorage';
let data = '{"entityMap":{},"blocks":[{"key":"c4d0i","text":"Hello","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"38mrh","text":"some initial text","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":3,"style":"BOLD"}],"entityRanges":[]}]}';


export default class App extends Component {
  constructor(props) {
    super(props);
    if (!LS.get('inited')) {
      this.initialize();
    } else {
      // let id = LS.get('currId')
      this.state = {
        id: LS.get('id')
        // header: LS.get(`h_${id}`),
        // body: LS.get(`b_${id}`),
      }
    }
    LS.showSize();
  }

  initialize() {
    LS.clear();
    let id = LS.set('id', 1, 'number');
    let header = LS.set('h_1', 'Hello world');
    let body = LS.set('b_1', data);
    LS.set('inited', true);
    // this.state = {header, body};
  }

  render() {
    // let {header, body} = this.state;
    let id = LS.get('id');
    return (
      <div>
        <div className="content">
          <Canvas
            id={id}
          />
        </div>
      </div>
    );
  }
}
