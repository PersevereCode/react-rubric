import './App.css';
import Section from './components/Section';

import Switch from '@mui/material/Switch';
import RUBRIC from './rubric.json'

import { useState } from 'react';
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

  const renderGradeBox = () =>{
    return <GradeBox key = 'grades'
            gradeNotesObj = {gradeNotesObj}/>;
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
