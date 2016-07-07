import React, { Component } from 'react';
// import RichEditor from './components/Editor';
import Canvas from './components/Canvas';
import List from './components/List';
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
        id: LS.get('id'),
        // FIXME -------------------
        list: LS.get('list', 'array').map(i => {return parseInt(i)})
        // -------------------------
        // header: LS.get(`h_${id}`),
        // body: LS.get(`b_${id}`),
      }
    }
    this.createNoteAction = this.createNoteAction.bind(this);
    this.chooseNoteAction = this.chooseNoteAction.bind(this);
    console.warn(`%cInitial LS size: ${LS.getSize()}`, 'color: purple');
  }

  initialize() {
    LS.clear();
    LS.set('id', 1, 'number');
    LS.set('list', [1, 2, 3], 'array');
    LS.set('h_1', 'Hello world');
    LS.set('b_1', data);
    LS.set('h_2', 'Second hello world');
    LS.set('b_2', data);
    LS.set('h_3', 'THIIIIRD3333 hello world )))');
    LS.set('b_3', data);
    this.state = {
      id: 1,
      list: [1, 2, 3]
    }
    LS.set('inited', true);
  }

  chooseNoteAction(id) {
    LS.set('id', id);
    this.setState({
      id: id
    })
  }

  createNoteAction() {
    let list = LS.get('list', 'array');
    // FIXME LS < recursive check type -----
    list = list.map(item => parseInt(item));
    // -------------------------------------
    let newId = Math.max(...list) + 1;
    list.push(newId);
    LS.set('list', list, 'array');
    LS.set(`h_${newId}`, '');
    LS.set(`b_${newId}`, '');
    LS.set('id', newId, 'number');
    this.setState({
      id: newId,
      list: list
    })
  }

  render() {
    let {id, list} = this.state;
    // //FIXME -----------------------------------
    // let id = LS.get('id', 'number');
    // let list = LS.get('list', 'array').map(i => {return parseInt(i)});
    // //-----------------------------------------
    return (
      <div>
        <div className="content">
          <List
            id={id}
            list={list}
            chooseNoteAction={this.chooseNoteAction}
            createNoteAction={this.createNoteAction}
          />
          <br/>
          <Canvas
            id={id}
          />
        </div>
      </div>
    );
  }
}
