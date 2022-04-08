import React, { Component } from 'react'
import axios from 'axios'

export default class EditPost extends Component {

    constructor(props){
        super(props);
        this.state={
            topic:"",
            description:"",
            postCategory:""
        }
    }

    handleInputChange = (e)=>{
        const{name, value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e)=>{
        
        e.preventDefault();

        const id = this.props.match.params.id;
        const{topic, description, postCategory} = this.state;

        const data ={
            topic:topic,
            description:description,
            postCategory:postCategory
        }

        console.log(data)

        axios.put(`/post/update/${id}`, data).then((res)=>{
            if(res.data.success){
                alert("Post Updated Succesfully!")
                this.setState({
                    topic:"",
                    description:"",
                    postCategory:""
                })
            }
        })
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`/post/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    topic:res.data.post.topic,
                    description:res.data.post.description,
                    postCategory:res.data.post.postCategory
                });

                console.log(this.state.post);
            }
        });
    }
    
    render() {
        return (
            <div>
               
                <form className="needs-validation" noValidate>
                <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Topic</label>
                <input type="text" className="form-control" name="topic" aria-describedby="emailHelp" value={this.state.topic} onChange={this.handleInputChange}/>
                </div>
                <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Description</label>
                <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.handleInputChange}/>
                </div>
                <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Post Category</label>
                <input type="text" className="form-control" name="postCategory" value={this.state.postCategory} onChange={this.handleInputChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Update</button>
                </form>
            </div>
        )
    }
}
