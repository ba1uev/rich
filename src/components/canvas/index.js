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

  keyDownHandler(e) {
    if (e.keyCode === 13) {
      e.preventDefault;
      console.log('enter');
      document.querySelector('.body').focus()
    }
  }

  headerChangeHadler(e) {
    console.log(e.keyCode);
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
      <div className="canvas">
        <input
          className='header'
          type='text'
          value={header}
          placeholder={!header ? 'Name your note' : null}
          onKeyDown={this.keyDownHandler}
          onChange={(e) => {this.headerChangeHadler(e)}}
          ref='noteHeader'
        />
        <div className='body'>
          <RichEditor
            body={body}
            onChange={(body) => this.bodyChangedHandler(body)}
          />
        </div>
        <button
          onClick={() => {this.props.deleteNoteHandler(id)}}
          className='act'
        >
          Delete note
        </button>
      </div>
    )
  }
}
