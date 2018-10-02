import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      input:''
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.changeHandler=this.changeHandler.bind(this);
  }
  

  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(response=>this.setState({posts:response.data}));
    
    
    
  }
changeHandler(e){
  this.setState({input:e.target.value});
  console.log(this.state.input);
  
}

  updatePost(id,text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text}).then(results=>this.setState({posts: results.data}))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?${id}`).then(results=>this.setState({posts:results.data}))
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`,{text}).then(results=>this.setState({posts:results.data}))
  }

  render() {
    // console.log(this.state.posts)
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header changeHandler={this.changeHandler}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {this.state.input ? posts.filter(elem=>elem.text.includes(this.state.input)).map(elem=><Post deletePostFn={this.deletePost} updatePostFn={this.updatePost} key={elem.id} date={elem.date} text={elem.text} id={elem.id}></Post>) : posts.map(elem=><Post deletePostFn={this.deletePost} updatePostFn={this.updatePost} key={elem.id} date={elem.date} text={elem.text} id={elem.id}></Post>)}
          
        </section>
      </div>
    );
  }
}

export default App;
