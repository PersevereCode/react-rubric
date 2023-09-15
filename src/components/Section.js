
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';

import { queryByTestId } from '@testing-library/react';
import Question from './Question';

function Section({section, gradeObj, setGradeObj}) {
    const {sectionTitle, questions,} = section;

    const [sectionTotal, setSectionTotal] = useState(0);
    const [sectionScoringObj, setSectionScoringObj] = useState({});
    const [sectionScore, setSectionScore] = useState(0);
    
    useEffect(() => {
        let total = 0;
        let scoreObj = {};
        questions.map(question => {
            if(question.type === 'boolean'){
                total += question.score;
                scoreObj[question.message || question.criteria] = 0
            }else if(question.type === 'likert'){
                //TODO rewrite so more forgiving on order of likert prompts
                total += question.options[question.options.length - 1].score;
                scoreObj[question.options[0].description] = 0;
            }
        })
        setSectionTotal(total)
        setSectionScoringObj(scoreObj)
    }, [])


    const renderForm = () => {
        return(
            questions.map(question => {
                return <div><Question question = {question} 
                setSectionScoringObj = {setSectionScoringObj}
                sectionScoringObj = {sectionScoringObj}
                setSectionScore = {setSectionScore}/></div>;
            })
        )
    }

    // const computeScore = (e) = {

    // }
    
  return (
    <div className='sectionCardContainer'>
            <Card sx={{ minWidth: 275 }} className='card'>
                <h2 className="sectionHead">{sectionTitle}<span className='scoring'>{sectionScore}/{sectionTotal}</span></h2>
                <h3 className="subHeading">{section.message}</h3>
                {renderForm()}
            </Card>
    </div>
  )
}

export default Section