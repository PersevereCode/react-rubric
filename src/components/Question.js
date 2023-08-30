import { MenuItem, Select } from '@mui/material';
import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function Question({question}) {

    const {
        criteria,
        type,
        score, 
        message,
        options
    } = question;

    const renderQuestion = () => {
        if(type === 'boolean'){
            return renderBoolean();
        }else if(type === 'likert'){
            return renderLikert()
        }
    }

    const renderBoolean = () =>{
        return(
        <div key={criteria}>
            <p className='question'>{criteria}<span className='scoring'>0/{typeof score === 'number' ? score : (options[options.length - 1]).score}</span></p>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="0"
                name="radio-buttons-group"
            >
                <FormControlLabel value={score} control={<Radio />} label="True" />
                <FormControlLabel value={0} control={<Radio />} label="False" />
            </RadioGroup>
        </div>)
    }

    const renderLikert = () =>{
        return(
            <div key={criteria} className='likert'>
                <p className='question'>{criteria}<span className='scoring'>0/5</span></p>
                <Select
                    value='0'
                    className='likertSelect'
                    // onChange={}
                >
                    {options.map(option => {
                        return(<MenuItem key ={option.description} value={option.score}>{`${option.description} (+${option.score})`}</MenuItem>)
                    })}
                </Select>
            </div>  
        )
    }

  return (
    <div>{renderQuestion()}</div>
  )
}

export default Question