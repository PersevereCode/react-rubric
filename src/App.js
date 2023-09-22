import './App.css';
import Section from './components/Section';

import Switch from '@mui/material/Switch';
import RUBRIC from './rubric.json'

import { useEffect, useState } from 'react';
import GradeBox from './components/GradeBox';

function App() {
  const [gradeObj, setGradeObj] = useState({});
  const [gradeNotesObj, setGradeNotesObj] = useState({})

  const renderRubric = () =>{
    return(
      RUBRIC.sections.map(i => {
        return(
          <Section key = {i.sectionTitle} 
                  gradeObj={gradeObj} 
                  setGradeObj={setGradeObj} 
                  section = {i}
                  gradeNotesObj = {gradeNotesObj}
                  setGradeNotesObj = {setGradeNotesObj}/>
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
  }, [])
  
  // useEffect(() => {
  //   console.log(gradeObj)
  // }, [gradeObj])
  

  const renderGradeBox = () =>{
    return <GradeBox key = 'grades'
            gradeObj = {gradeObj}/>;
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
