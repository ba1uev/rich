import React, { Component } from 'react';
import RichEditor from './RichEditor';
import LS from '../../utils/LocalStorage';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    let {id} = props;
    this.state = {
      id: id,
      header: LS.get(`h_${id}`),
      body: LS.get(`b_${id}`)
    }
  }

  headerChangeHadler() {
    this.setState({
      header: this.refs.noteHeader.value
    })
    let {id} = this.state;
    LS.set(`h_${id}`, this.refs.noteHeader.value);
  }

  bodyChangedHandler(body) {
    let {id} = this.state;
    LS.set(`b_${id}`, body)
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
        <br/>
        <RichEditor
          noteBody={body}
          onChange={(body) => this.bodyChangedHandler(body)}
        />
      </div>
    )
  }
}
