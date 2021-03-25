import React,{useState} from 'react'
import Base from '../core/Base'
import { Link } from "react-router-dom"
import { isAuthenticated } from '../auth/helper'
import { addCategory } from './helper/adminapicall'

export default function AddCategory() {

    const { user, token } = isAuthenticated()
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    
    const handleChage = ({target:{value}})=>{
        setError(false)
        setName(value)
        setSuccess(false)
    }

    const handleSubmit = event =>{
        event.preventDefault();
        addCategory({name},token,user._id)
            .then(data=>{
                if(data.error){
                    setError(data.error)
                }
                else{
                    setSuccess(true)
                    setError("")
                    setName("")
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const errorMessage =()=>{
        return (
            <div className = "row">
                <div  className="col-md-6 text-left">
                    <div className="alert alert-danger" style={{display:error?"":"none"}}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const successMessage = () =>(
        <div className = "row">
            <div  className="col-md-6 text-left">
                <div className="alert alert-success" style={{display:success?"":"none"}}>
                    Category successfully Created !!
                </div>
            </div>
        </div>
    )

    const categoryform = ()=>{
        return(
            <form>
                <div className = "form-group">
                    <input
                    type="text"
                    className = "form-control mt-3"
                    placeholder = "for e.g. Summer"
                    autoFocus
                    required
                    value = { name }
                    onChange = {handleChage}
                    /> 
                </div>
                <div className = "btn btn-sm btn-info outline mt-4 mb-4 " onClick={handleSubmit}>Add Category</div>
            </form>
        )
    }

    const goBack = ()=>(
        <div className = "btn btn-sm btn-success outline mb-4">
            <Link to = "/user/admindashboard" className="text-white">
                Go Back
            </Link>
        </div>
    )


    return (
        <Base title = "Create Category" description = "add category for the products">
            <div className = "container bg-info p-4">
                <div className= "row bg-white rounded">
                    <div className = "col-md-8 offset-md-2">
                        <h1>Create Category</h1>
                        {successMessage()}
                        {errorMessage()}
                        {categoryform()}
                        {goBack()}
                    </div>
                </div>
            </div>
            
        </Base>
    )
}
