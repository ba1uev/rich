import React, { Component } from 'react';
import RichEditor from './RichEditor';
import Draft, { convertToRaw, convertFromRaw, convertFromHTML} from 'draft-js';
import LS from '../../utils/LocalStorage';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: ''
    }
  }

  headerChangeHadler() {
    this.setState({
      header: this.refs.noteHeader.value
    })
    let {id} = this.props;
    LS.set(`h_${id}`, this.refs.noteHeader.value);
    this.props.headerChangeHadler(this.refs.noteHeader.value)
  }

  bodyChangedHandler(body) {
    let {id} = this.props;
    LS.set(`b_${id}`, body)
  }

  render(){
    let {id} = this.props;
    let header = LS.get(`h_${id}`) || '';
    let body = LS.get(`b_${id}`) || false;
    return (
      <div>
        <button
          onClick={() => {this.props.deleteNoteHandler(id)}}
        >
          Delete note
        </button>
        <br/>
        <input
          className='editor-header'
          type='text'
          value={header}
          onChange={() => {this.headerChangeHadler()}}
          ref='noteHeader'
        />
        <br/>
        <br/>
        <RichEditor
          body={body}
          onChange={(body) => this.bodyChangedHandler(body)}
        />
      </div>
    )
  }
}
