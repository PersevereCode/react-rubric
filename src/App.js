import logo from './logo.svg';
import './App.css';
import Section from './components/Section';
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch';
import RUBRIC from './rubric.json'
import Card from '@mui/material/Card';
import { useState } from 'react';

function App() {
  const [gradeObj, setGradeObj] = useState({});

  const renderRubric = () =>{
    return(
      RUBRIC.sections.map(i => {
        return(
          <Section key = {i.sectionTitle} 
                  gradeObj={gradeObj} 
                  setGradeObj={setGradeObj} 
                  section = {i}/>
        )
      })
    )
  }

  const renderGradeSheet = () =>{
    return(
      gradeObj.map(i => {
        return(
          'hello'
        )
      })
    )
  }
  
  return (
    <div className="App">
      <div id="projectTitle">
        <h1>{RUBRIC.projectName}</h1>
        <Switch/>
      </div>
      {renderRubric()}
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
    </div>
  );
}

export default App;
