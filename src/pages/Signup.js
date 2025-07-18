import React from 'react'
import "../styles/Auth.css"
import InputPrimary from '../components/InputPrimary'
import ButtonPrimary from '../components/ButtonPrimary'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import full_logo from "../static/images/full_logo.png"
const Signup = ({api,setToken}) => {
  const [form,setForm] = React.useState({
    "email":"",
    "password":"",
    "first_name":"",
    "last_name":""
  })
  const [loading,setLoading] = React.useState(false)
  const navigate = useNavigate()
  const handleSubmit = async ()=>{
    setLoading(true)
    await fetch(api+"/auth/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(form)
    }).then((res)=>res.json()).then((data)=>{
      if (data.error){
        setLoading(false)
        toast.error(data.message,{
          iconTheme:{primary:"#fff",secondary:"var(--primary-color)"},
          style:{
            borderRadius:"30px",
            background:"var(--primary-color)",
            color:"white",
            fontWeight:"100",
            fontSize:"12px"
          }
        })
      }else{
        setLoading(false)     
        navigate("/auth/verify/"+data.data.slug,{state:{email:form.email}})
      }
    })
  }
  return (
    <>
      <div className='page auth_page'>
        <div className='side_bar'>
            <div className='logo'>
                <img className='logo_img' src={full_logo} alt="Full Logo" />
            </div>
            <div className='content'>
              <h2>Let's learn<br/>something<br/>amazing today.</h2>
              <p>It's the power of new generation.<br/>Join the classroom today.</p>
            </div>
            <div className='vector'>
              <span></span>
            </div>
        </div>
        <div className='form_section'>
          <div className='inner_section'>
            <div className='header'>
              <h1>👋</h1>
              <h2>Nice to see you!</h2>
            </div>
            <div className='form'>
              <div className='divider'>
              <InputPrimary placeholder="First name" type="text" value={form.first_name} onChange={(e)=>{setForm({...form,first_name:e.target.value})}}/>
              <InputPrimary placeholder="Last name" type="text" value={form.last_name} onChange={(e)=>{setForm({...form,last_name:e.target.value})}}/>
              </div>
              <InputPrimary placeholder="Email address" type="email" value={form.email} onChange={(e)=>{setForm({...form,email:e.target.value})}}/>
              <InputPrimary placeholder="Password" type="password" value={form.password} onChange={(e)=>{setForm({...form,password:e.target.value})}}/>
              <ButtonPrimary disabled={loading} onClick={handleSubmit}>{loading?<span className='btn_loading'></span>:<>Sign up &nbsp;<i className="fa-regular fa-arrow-right"></i></>}</ButtonPrimary>
            </div>
            <div className='refer_section'>
              <span>OR</span>
              <p>Have an account? <Link className='link_secondary' to="/auth/signin">Sign in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup