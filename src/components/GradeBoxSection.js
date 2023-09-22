import React from 'react'
import { Button } from '@mui/material'

function GradeBoxSection({section, sectionTitle}) {

    const renderCriteria = () =>{
        return(
            <div className='gradeBox'>
                {Object.keys(section).map(criteria =>{
                    return <p>* {criteria}</p>
                })}
            </div>
        )
    }
  return (
    <div>
        <h3>Deployment</h3>
        {renderCriteria()}
        <Button>Copy to Clipboard</Button>
    </div>
  )
}

export default GradeBoxSection