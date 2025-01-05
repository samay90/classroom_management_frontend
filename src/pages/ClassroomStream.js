import React from 'react'
import conv from "../static/banner.json" 
import Icon from "../components/icon"
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
const ClassroomStream = ({classroom,data,api}) => {  
  const navigate = useNavigate() 
  return (
    <div className='main_content'>
        {classroom?classroom.banner_id?<div className='banner' style={{backgroundImage:`url(${api}/banners/${conv[classroom?.banner_id]})`}}>
          <h1>{classroom?.class_name}</h1>
          <span className='banner_settings' onClick={()=>{navigate(`/app/classroom/${classroom?.class_id}/settings`)}}><i className="fa-regular fa-gear"></i></span>
        </div>:"":""}
      <div>
        <div className='classroom_cards'>
          {data.length===0?<div className='skeleton_classroom_card classroom_card'>
            <div className='tags'>
              <div className='tag'></div>
              <div className='tag'></div>
            </div>
            <div className='creator_info'>
              <span className='ske_icon'></span>
              <div className='ske_info'>
                <h3>&nbsp;</h3>
                <p></p>
              </div>
            </div>
            <div className='body'>
              <h4>&nbsp;</h4>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>:""}
        {data.map((item,key)=>{
          return <div className='classroom_card' onClick={()=>{navigate(item.resource_id?`resource/${item.resource_id}`:`assignment/${item.assignment_id}`)}}  key={key}>
            <div className='tags'>
            {classroom?<div className='tag' style={{backgroundImage:`url(${api}/banners/${conv[classroom?.banner_id]})`}}>{item.resource_id?<h3><i className="fa-regular fa-book"></i> Resource</h3>:<h3><i className="fa-regular fa-ballot-check"></i> Assignment</h3>}</div>:""}
            {item.assignment_id?<div className='tag' style={{backgroundImage:`url(${api}/banners/${conv[classroom?.banner_id]})`}}><h3><i className="fa-regular fa-bullseye-arrow"></i> {item.total_marks} marks</h3></div>:""}
            </div>
            <div className='creator_info'>
              <div className='icon_image'>
              <Icon url={item.creator_profile_image?api+"/profile/"+item.creator_profile_image:null} height={35} chr={item.creator_first_name[0]}/>
              </div>
              <div className='info'>
                <h3>{item.creator_first_name} {item.creator_last_name}</h3>
                <p>{moment(parseInt(item.created_at)).format("ll")} {item.created_at!==item.updated_at?`(Edited on ${moment(parseInt(item.updated_at)).format("ll")})`:""}</p>
              </div>
            </div>
            {item.due_date_time?<p className='due_date'>Due on {moment(parseInt(item.due_date_time)).format("lll")}</p>:""}
            <div className='body'>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
            {
              item.resource_id?<div className='comment'>
                <button><i className="fa-regular fa-comment-question"></i> Ask query...</button>
              </div>:""
            }
          </div>
        })}
        </div>
      </div>
      </div>
  )
}

export default ClassroomStream