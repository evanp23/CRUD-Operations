import { Component } from "react";
import './PostBoxStyle.css';

export default class PostBox extends Component{

    constructor(props){
        super(props);

        this.state = {
            editing: false,
            editButtonText: "edit",
            updatedTitle: '',
            updatedDescription: '',
        }

        this.deletePost = this.deletePost.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
    }

    componentDidMount(){
        this.setState({updatedTitle: this.props.post.title, updatedDescription: this.props.post.description});
    }

    componentWillUnmount(){

    }

    render(){
        return(
            <div id="postOuterDiv">
                {this.state.editing ? (
                    <form id="editingForm">
                        <input type="text" value={this.state.updatedTitle} id="editingTitleInput" onChange={this.updateTitle}>
                        </input>
                        <input type="text" value={this.state.updatedDescription} id="editingDescInput" onChange={this.updateDescription}>
                        </input>
                    </form>
                ) : (
                    <>
                        <h2>
                            {this.props.post.title}
                        </h2>
                        <p>
                            {this.props.post.description}
                        </p>
                    </>
                )}
                <button onClick={this.handleEditClick}>
                    {this.state.editButtonText}
                </button>
                {this.state.editing ? (
                    <button onClick={this.updatePost}>
                        submit
                    </button>
                ) : (
                    <button onClick={this.deletePost}>
                        delete
                    </button>
                )}
            </div>
        );
    }

    async deletePost(e){
        e.preventDefault();
        // Default options are marked with *
        const response = await fetch(("http://localhost:5001/posts/" + this.props.post._id), {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        this.props.get();
    }

    handleEditClick(){
        var editText = '';
        this.state.editButtonText === "edit" ? editText = "cancel" : editText = "edit";
        this.setState({
            editing: !this.state.editing,
            editButtonText: editText
        });
    }

    updateTitle(e){
        this.setState({
            updatedTitle: e.target.value
        })
    }

    updateDescription(e){
        this.setState({
            updatedDescription: e.target.value
        })
    }

    async updatePost(){
        const response = await fetch(("http://localhost:5001/posts/" + this.props.post._id), {
          method: 'PATCH',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "title": this.state.updatedTitle,
            "description": this.state.updatedDescription
          })
        });
        console.log(response);
        this.setState({editing: false, editButtonText: "edit"})
        this.props.get();
    }
}