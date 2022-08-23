import React, { Component } from "react";
import PostBox from "../../Components/PostBox";
import './PostingScreenStyle.css';

export default class PostingScreen extends Component{

    postModel = {
        title: '',
        description: ''
    }

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            posts: null,
            titleInput: '',
            descInput: ''
        }

        this.getPosts = this.getPosts.bind(this);
        this.handleDescriptionInputChange = this.handleDescriptionInputChange.bind(this);
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
        this.submitNewPost = this.submitNewPost.bind(this);
    }

    componentDidMount(){
        this.getPosts();
    }

    componentWillUnmount(){

    }

    render(){
        return(
            <div id="pageBox">
                <div>

                    <form id="newPostInputForm" onSubmit={this.submitNewPost}>
                        <input placeholder="Title" onChange={this.handleTitleInputChange}>

                        </input>
                        <input placeholder="Description" onChange={this.handleDescriptionInputChange}>

                        </input>
                        <button type="submit">submit</button>
                    </form>

                    {
                        !this.state.posts && this.state.loading ? (<>loading</>) : (
                            this.state.posts.map((val, key) => {
                                return (
                                    <PostBox post={val} get={this.getPosts} key={key}></PostBox>
                                );
                            })
                        )
                    }
                </div>
            </div>
        );
    }

    async getPosts(){
        this.setState({
            loading: true
        })
        fetch('http://localhost:5001/posts').then(
            (res) =>{
                return res.json()
            }).then(
                (data)=>{
                    console.log(data);
                    this.setState({
                        posts: data,
                        loading: false
                    });
                }
            );
    }

    handleTitleInputChange(event){
        this.setState({titleInput: event.target.value});
    }

    handleDescriptionInputChange(event){
        this.setState({descInput: event.target.value});
    }

    async submitNewPost(e) {
        e.preventDefault();
        // Default options are marked with *
        const response = await fetch('http://localhost:5001/posts', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "title": this.state.titleInput,
            "description": this.state.descInput
          })
        });
        console.log(response);

        this.getPosts();
    }
}