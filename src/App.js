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
      let id = LS.get('id')
      this.state = {
        id: id,
        // FIXME ------------------- !!
        list: LS.get('list', 'array').map(id => {return parseInt(id)}),
        // -------------------------
        // headers: this.getHeaders(),
        // TODO make single state property headerMap: [{id: 666, header: 'Hello'},{},..]
        notesMap: this.getNotesMap()
      }
    }
    this.createNoteAction = this.createNoteAction.bind(this);
    this.chooseNoteAction = this.chooseNoteAction.bind(this);
    // this.getHeaders = this.getHeaders.bind(this);
    this.getNotesMap = this.getNotesMap.bind(this);
    // console.warn(`%cInitial LS size: ${LS.getSize()}`, 'color: purple');
  }

  // getHeaders(){
  //   return LS.get('list', 'array').map(id => {return LS.get(`h_${id}`)});
  // }

  getNotesMap() {
    return LS.get('list', 'array').map(id => {return {id, header: LS.get(`h_${id}`)}})
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
      list: [1, 2, 3],
      // headers: this.getHeaders(),
      notesMap: this.getNotesMap()
    }
    // LS.set('inited', true);
  }

  chooseNoteAction(id) {
    LS.set('id', id);
    this.setState({
      id: id
    })
  }

  headerChangeHadler(title) {
    // console.log(title);
    let id = LS.get('id');
    //  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TODO  changed header binding
    // this.setState({
    //   notesMap: this.getN
    // })
  }

  createNoteAction() {
    let list = LS.get('list', 'array');
    // FIXME LS < recursive check type ----- !!
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
      list: list,
      // headers: this.getHeaders()
      notesMap: this.getNotesMap()
    });
    document.querySelector('.editor-header').focus();
  }

  render() {
    let {id, list, notesMap} = this.state;
    return (
      <div>
        <div className="content">
          <List
            id={id}
            list={list}
            notesMap={notesMap}
            chooseNoteAction={this.chooseNoteAction}
            createNoteAction={this.createNoteAction}
          />
          <br/>
          <Canvas
            id={id}
            headerChangeHadler={this.headerChangeHadler}
          />
        </div>
      </div>
    );
  }
}
