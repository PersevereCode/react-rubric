import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import GradeBoxSection from './GradeBoxSection';
import { useEffect, useState } from 'react';

function GradeBox({gradeObj, totalPossible, sectionTotals}) {
  const [total, setTotal] = useState(0)


  const totalScore = () => {
    let sum = 0
    for(let section in gradeObj){
      for(let question in gradeObj[section]){
        sum += gradeObj[section][question]
      }
    }
    setTotal(sum)
  }

  const renderGradeBoxSections = () => {
    return(
      Object.keys(gradeObj).map(sectionTitle => {
        return <GradeBoxSection key={sectionTitle}
                                section = {gradeObj[sectionTitle]}
                                sectionTitle = {sectionTitle}
                                totalPossibleScoreInSection = {sectionTotals[sectionTitle]}/>
      })
    )
  }

  useEffect(() => {
   totalScore()
  }, [gradeObj])

  return (
    <div className='sectionCardContainer'>
        <Card sx={{ minWidth: 275 }} className='card'>
            <h2 className="sectionHead">Recommended Grade: F</h2>
            <h2 className="sectionHead">Total: ({total}/{totalPossible})</h2>
            <Card sx={{ minWidth: 275, backgroundColor: '#d5d9de' }} className='innerCard'>
              {renderGradeBoxSections()}
            </Card>
        </Card>
    </div>
  )
}

export default GradeBox