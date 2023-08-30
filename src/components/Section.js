
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MenuItem, Select, InputLabel, Box} from '@mui/material';
import { queryByTestId } from '@testing-library/react';

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
                if(question.type === 'boolean'){
                    return renderBoolean(question);
                }else if(question.type === 'likert'){
                    return renderLikert(question)
                }
            })
        )
    }

    const renderBoolean = (obj) =>{
        return(
        <div key={obj.criteria}>
            <p className='question'>{obj.criteria}<span className='scoring'>0/{obj.score}</span></p>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="0"
                name="radio-buttons-group"
            >
                <FormControlLabel value={obj.score} control={<Radio />} label="True" />
                <FormControlLabel value={0} control={<Radio />} label="False" />
            </RadioGroup>
        </div>)
    }

    const renderLikert = (obj) =>{
        return(
            <div key={obj.criteria} className='likert'>
                <p className='question'>{obj.criteria}<span className='scoring'>0/8</span></p>
                <Select
                    value='0'
                    className='likertSelect'
                    // onChange={}
                >
                    {obj.options.map(option => {
                        return(<MenuItem key ={option.description} value={option.score}>{option.description}</MenuItem>)
                    })}
                </Select>
            </div>  
        )
    }
  return (
    <div className='sectionCardContainer'>
            <Card sx={{ minWidth: 275 }} className='card'>
                <h2 className="sectionHead">{sectionTitle}<span className='scoring'>0/{sectionTotal}</span></h2>
                <h3 className="subHeading">Keep your browser console open and watch out for errors from this point forward.</h3>
                {renderForm()}
            </Card>
    </div>
  )
}

export default Section