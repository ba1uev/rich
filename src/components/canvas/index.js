import React, { Component } from 'react';
import RichEditor from './RichEditor';
import LS from '../../utils/LocalStorage';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    let {currId} = props;
    this.state = {
      header: LS.get(`h_${currId}`),
      body: LS.get(`b_${currId}`)
    }
  }
  headerChangeHadler() {
    console.clear();
    console.log(this.refs.noteHeader.value);
    this.setState({
      header: this.refs.noteHeader.value
    })
  }
  render(){
    let {header, body} = this.state;
    return (
      <div>
        <input
          type='text'
          value={header}
          onChange={() => {this.headerChangeHadler()}}
          ref='noteHeader'
        />
        <RichEditor
          noteBody={body}
        />
      </div>
    )
  }
}
