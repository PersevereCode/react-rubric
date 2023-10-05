import './App.css';
import Section from './components/Section';

import Switch from '@mui/material/Switch';
import RUBRIC from './rubric.json'

import { useEffect, useState } from 'react';
import GradeBox from './components/GradeBox';

function App() {
  const [gradeObj, setGradeObj] = useState({});
  const [gradeNotesObj, setGradeNotesObj] = useState({})
  const [totalPossible, setTotalPossible] = useState(0)
  const [sectionTotals, setSectionTotals] = useState({})

  
  const findTotalPossible = () => {
    let total = 0;
    const obj = {};
    RUBRIC.sections.forEach(section => {
      let sectionTotal = 0
      section.questions.map(question => {
        if(question.type === 'boolean'){
          sectionTotal += question.score;
        }else if(question.type === 'likert'){
          //TODO rewrite so more forgiving on order of likert prompts
          sectionTotal += question.options[question.options.length - 1].score;
        }
      })
      obj[section.sectionTitle] = sectionTotal;
      total += sectionTotal
    })
    setSectionTotals(obj)
    setTotalPossible(total)
  }
    
    
  const renderRubric = () =>{
    return(
      RUBRIC.sections.map(i => {
        return(
          <Section key = {i.sectionTitle.split(' ').join('')} 
                  gradeObj={gradeObj} 
                  setGradeObj={setGradeObj} 
                  section = {i}
                  gradeNotesObj = {gradeNotesObj}
                  setGradeNotesObj = {setGradeNotesObj}
                  />
        )
      })
    )
  }

  const populateGradeSheet = () => {
    const gradeSheet = {};
    RUBRIC.sections.map((section) =>{
      const sectionObj = {};
      for(let question of section.questions){
        if(question.type === 'boolean'){
          sectionObj[question.message] = 0
        }else if(question.type === 'likert'){
          sectionObj[question.options[0].description] = 0 
        }
      }
      gradeSheet[section.sectionTitle] = sectionObj
    })
    setGradeObj({...gradeSheet})
  }

  useEffect(() => {
    populateGradeSheet()
    findTotalPossible()
  }, [])

  const renderGradeBox = () =>{
    return <GradeBox key = 'grades'
            gradeObj = {gradeObj}
            totalPossible = {totalPossible}
            sectionTotals = {sectionTotals}
            RUBRIC = {RUBRIC}/>;
  }
  
  return (
    <div className="App">
      <div id="projectTitle">
        <h1>{RUBRIC.projectName}</h1>
        <Switch/>
      </div>
        {renderRubric()}
        {renderGradeBox()}
      </div>
  );
}

export default App;
