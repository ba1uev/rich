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
    let {id} = this.props;
    let list = this.props.notesMap.map(note => {
      let isActive = note.id == id;
      let header = note.header ? note.header : 'No name';
      return (
        <div
          className={isActive ? 'list-item active' : 'list-item'}
          key={note.id}
          onClick={() => this.chooseNote(note.id)}
        >
          {header}
        </div>
      )
    })
    return (
      <div className="list" style={{backgroundColor: '#fff'}}>
        {list}
        <button className="act list-new" onClick={this.createNote}>New note</button>
      </div>
    )
  }
}
