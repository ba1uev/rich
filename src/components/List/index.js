import React, {Component} from 'react';
import LS from '../../utils/LocalStorage';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id
    }
  }

  chooseNote(e){
    LS.set('currentNoteId', e.target.dataset.id);
    this.props.chooseNoteAction(e.target.dataset.id);
  }

  createNote(){
    this.props.createNote()
  }

  render() {
    let list = [];
    LS.get('list', 'array').map(id => {
      let header = LS.get(`h_${id}`);
      list.push(
        <div key={`header_${id}`} style={{backgroundColor: 'yellow'}}>{`YES_${id}`}</div>
      )
    });
    return (
      <div className="list">
        {list}
      </div>
    )
    // var currId = this.props.currentNoteId;
    // var notesMap = this.props.notesMap;
    // var notes = [];
    // if (notesMap) {
    //   notesMap.forEach((id) => {
    //     let title = LS.get('title', id);
    //     notes.push(
    //       <div
    //         className={currId === +id ? "list-item active" : "list-item"}
    //         data-id={id}
    //         onClick={this.chooseNote}
    //         key={id}
    //       >{title ? title : <span data-id={id} className="empty">No name</span>}</div>
    //     )
    //   })
    // }
    // return (
    //   <div className="list">
    //     {notes}
    //     <button className="list-new" onClick={this.createNote}>New note</button>
    //   </div>
    // )
  }
}
