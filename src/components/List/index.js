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
    let list = [];
    let wow ='wow';
    LS.get('list', 'array').forEach(id => {
      let header = LS.get(`h_${id}`);
      list.push(
        <div
          className="list-item"
          key={`header_${id}`}
          style={{backgroundColor: 'yellow'}}
          onClick={() => this.chooseNote(id)}
        >{header}</div>
      )
    });
    return (
      <div className="list" style={{backgroundColor: '#fff'}}>
        {list}
        <button className="list-new" onClick={this.createNote}>New note</button>
      </div>
    )
  }
}
