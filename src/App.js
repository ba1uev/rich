import React, { Component } from 'react';
import Canvas from './components/Canvas';
import List from './components/List';
import LS from './utils/LocalStorage';

import './styles/index.scss';

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
        notesMap: this.getNotesMap()
      }
    }
    this.createNoteAction = this.createNoteAction.bind(this);
    this.chooseNoteAction = this.chooseNoteAction.bind(this);
    this.getNotesMap = this.getNotesMap.bind(this);
    this.headerChangeHadler = this.headerChangeHadler.bind(this);
    this.deleteNoteHandler = this.deleteNoteHandler.bind(this);
    console.warn(`%cInitial LS size: ${LS.getSize()}`, 'color: purple');
  }

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
      notesMap: this.getNotesMap()
    }
    LS.set('inited', true);
  }

  chooseNoteAction(id) {
    LS.set('id', id);
    this.setState({
      id: id
    })
  }

  headerChangeHadler(header) {
    let {id} = this.state;
    let notesMap = this.getNotesMap().map(note => {
      if (note.id == id) {
        note.header = header;
        return note
      }
      return note
    })
    this.setState({notesMap});
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
      notesMap: this.getNotesMap()
    });
    document.querySelector('.editor-header').focus();
  }

  deleteNoteHandler(id) {
    let header = LS.get(`h_${id}`);
    if (confirm(`Are you sure to remove note "${header}"?`)) {
      let notesMap = this.getNotesMap();
      let removeNoteIndex;
      notesMap.forEach((note, index) => {
        if (note.id == id) removeNoteIndex = index;
      });
      notesMap.splice(removeNoteIndex, 1);
      let {list} = this.state;
      let removeIndex = list.indexOf(id);
      if (removeIndex != -1) {
        list.splice(removeIndex, 1);
      } else {
        console.error('Delete note ERROR: Note index not found.')
      }
      let nextId = Math.max(...list);
      LS.set('list', list, 'array');
      LS.set('id', nextId, 'number');
      LS.remove(`h_${id}`);
      LS.remove(`b_${id}`);
      this.setState({notesMap, id: nextId});
    }
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
            deleteNoteHandler={this.deleteNoteHandler}
          />
        </div>
      </div>
    );
  }
}
