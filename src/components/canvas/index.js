import React, { Component } from 'react';
import RichEditor from './RichEditor';
import LS from '../../utils/LocalStorage';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    let {currId} = props;
    this.state = {
      id: currId,
      header: LS.get(`h_${currId}`),
      body: LS.get(`b_${currId}`)
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
    // if (!this.state) console.log(this.state); return
    // let {id} = this.state;
    // LS.set(`b_${id}`, body)
    console.log(body);
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
          onChange={this.bodyChangedHandler}
        />
      </div>
    )
  }
}
