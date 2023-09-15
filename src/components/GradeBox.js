import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button'

function GradeBox() {
  return (
    <div className='sectionCardContainer'>
        <Card sx={{ minWidth: 275 }} className='card'>
            <h2 className="sectionHead">Recommended Grade: F</h2>
            <h2 className="sectionHead">Total: (0/100)</h2>
            <Card sx={{ minWidth: 275, backgroundColor: '#d5d9de' }} className='innerCard'>
              <div>
                <h3>Deployment</h3>
                <div className='gradeBox'>
                  <p>* Application isn't deployed</p>
                  <p>* Application isn't deployed</p>
                  <p>* Application isn't deployed</p>
                  <p>* Application isn't deployed</p>
                </div>
                <Button>Copy to Clipboard</Button>
                </div>
            </Card>
        </Card>
    </div>
  )
}

export default GradeBox