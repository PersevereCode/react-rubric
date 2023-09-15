import { MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect } from 'react';

function Question({ question, 
                    setSectionScoringObj, 
                    sectionScoringObj,
                    setSectionScore}) {

    const {
        criteria,
        type,
        score, 
        options,
        message
    } = question;

    const [questionValue, setQuestionValue] = useState(0);

    const renderQuestion = () => {
        if(type === 'boolean'){
            return renderBoolean();
        }else if(type === 'likert'){
            return renderLikert()
        }
    }

    const handleBoolOnChange = (e) =>{
        if(e.target.value !== 0){
            //Edit the scoring obj to add the affirmative message and delete the fail message and score
            setQuestionValue(e.target.value)
            let obj = {...sectionScoringObj};
            obj[criteria] = +e.target.value;
            delete obj[message];
            setSectionScoringObj(obj)
        }else if(e.target.value === 0){
            //Edit the scoring obj to add the fail message and delete the affirmative message and score 
            setQuestionValue(e.target.value)
            let obj = {...sectionScoringObj};
            obj[message] = +e.target.value;
            delete obj[criteria];
            setSectionScoringObj(obj)
        }
        
    }

    const handleLikertOnChange = (e) =>{
        let obj = {...sectionScoringObj}
        //iterate through likert question, deleting all prompts in the obj
        for(let key in options){
            delete obj[options[key]['description']]
        }
        //passed in the iteration variable so the description and 
        //score are both passed in as a result of the constraints of the menuitem component
        const option = options[e.target.value];
        obj[option.description] = option.score;
        //add the value and description to the object
        setQuestionValue(option.score);
        setSectionScoringObj(obj);
        //set the scoring object

    }

    function totalSection(){
        let total = 0;
        for(let key in sectionScoringObj){
            total += sectionScoringObj[key];
        }
        console.log(total)
        setSectionScore(total);
    }

    useEffect(() => { //Every time a score changes
      totalSection()
    }, [sectionScoringObj])
    

    const renderBoolean = () =>{
        return(
        <div key={criteria}>
            <p className='question'>{criteria}<span className='scoring'>{questionValue} /{typeof score === 'number' ? score : (options[options.length - 1]).score}</span></p>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={0}
                name="radio-buttons-group"
                onChange={(e)=> handleBoolOnChange(e)}
            >
                <FormControlLabel value={score} control={<Radio />} label="True" />
                <FormControlLabel value={0} control={<Radio />} label="False" />
            </RadioGroup>
        </div>)
    }

    const renderLikert = (e) =>{
        return(
            <div key={criteria} className='likert'>
                <p className='question'>{criteria}<span className='scoring'>{questionValue}/5</span></p>
                <FormControl>
                <Select
                    defaultValue={0}
                    className='likertSelect'
                    onChange={(e) => handleLikertOnChange(e)}
                >
                    {options.map((option, i) => {
                        return(
                            <MenuItem key ={option.description}
                                      value={i}
                                >{`${option.description} (+${option.score})`}
                            </MenuItem>)
                    })}
                </Select>
                </FormControl>
            </div>  
        )
    }

  return (
    <div>{renderQuestion()}</div>
  )
}

export default Question