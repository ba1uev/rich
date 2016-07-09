import React, {Component} from 'react';
import LS from '../../utils/LocalStorage';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id
    }
    this.chooseNote = this.chooseNote.bind(this);
    this.createNote = this.createNote.bind(this);
  }

  chooseNote(id){
    this.props.chooseNoteAction(id);
  }

  createNote(){
    this.props.createNoteAction()
  }

  render() {
    let list = this.props.notesMap.map(note => {
      return (
        <div
          className="list-item"
          key={note.id}
          style={{backgroundColor: '#eee', marginBottom: '10px'}}
          onClick={() => this.chooseNote(note.id)}
        >
          {note.header}
        </div>
      )
    })
    return (
      <div className="list" style={{backgroundColor: '#fff'}}>
        {list}
        <button className="list-new" onClick={this.createNote}>New note</button>
      </div>
    )
  }
}
