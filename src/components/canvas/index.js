import React, { Component } from 'react';
import RichEditor from './RichEditor';
import LS from '../../utils/LocalStorage';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    // let {id} = props;
    this.state = {
      // id: id,
      // header: LS.get(`h_${id}`),
      body: 'LS.get(`b_${id}`)'
    }
  }

  componentWillReceiveProps(a, b) {
    // console.log('new props in CANVAS', a, b);
  }

  headerChangeHadler() {
    this.setState({
      header: this.refs.noteHeader.value
    })
    let {id} = this.props;
    LS.set(`h_${id}`, this.refs.noteHeader.value);
  }

  bodyChangedHandler(body) {
    // console.log(body);
    let {id} = this.props;
    LS.set(`b_${id}`, body)
  }

  render(){
    // let {header, body} = this.state;
    let {id} = this.props;
    let header = LS.get(`h_${id}`);
    let body = LS.get(`b_${id}`);
    console.log(id,body);
    return (
      <div>
        <input
          type='text'
          value={header}
          onChange={() => {this.headerChangeHadler()}}
          ref='noteHeader'
        />
        <br/>
        <br/>
        <RichEditor
          noteBody={body}
          onChange={(body) => this.bodyChangedHandler(body)}
        />
      </div>
    )
  }
}
