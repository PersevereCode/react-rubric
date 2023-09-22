import React from 'react'
import { Button } from '@mui/material'

function GradeBoxSection({section, sectionTitle}) {

    const renderCriteria = () =>{
        return(
            <div className='gradeBox'>
                {Object.keys(section).map(criteria =>{
                    if(!section[criteria]){
                        return <p key= {criteria}>* {criteria}</p>
                    }else{
                        
                    }
                })}
            </div>
        )
    }
  return (
    <div>
        <h3>{sectionTitle}</h3>
        {renderCriteria()}
        <Button>Copy to Clipboard</Button>
    </div>
  )
}

export default GradeBoxSection