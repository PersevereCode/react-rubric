
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';

import { queryByTestId } from '@testing-library/react';
import Question from './Question';

function Section({section}) {
    const {sectionTitle, questions} = section;

    const [sectionTotal, setSectionTotal] = useState(0);
    const [sectionScore, setSectionScore] = useState(0);
    
    useEffect(() => {
        let total = 0;
        questions.map(question => {
            if(question.type === 'boolean'){
            total += question.score;
            }else if(question.type === 'likert'){
                total += question.options[question.options.length - 1].score;
            }
        })
        setSectionTotal(total)
    }, [])

    const renderForm = () => {
        return(
            questions.map(question => {
                return <div><Question question = {question} /></div>;
            })
        )
    }

    
  return (
    <div className='sectionCardContainer'>
            <Card sx={{ minWidth: 275 }} className='card'>
                <h2 className="sectionHead">{sectionTitle}<span className='scoring'>0/{sectionTotal}</span></h2>
                <h3 className="subHeading">{section.message}</h3>
                {renderForm()}
            </Card>
    </div>
  )
}

export default Section