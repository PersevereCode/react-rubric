import logo from './logo.svg';
import './App.css';
import Section from './components/Section';
import Switch from '@mui/material/Switch';
import RUBRIC from './rubric.json'
import Card from '@mui/material/Card';
import { grey } from '@mui/material/colors';

function App() {
  const renderRubric = () =>{
    return(
    RUBRIC.sections.map(i => {
      return(
        <Section key = {i.sectionTitle} section = {i}/>
      )
    }))
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
            <Card sx={{ minWidth: 275, backgroundColor: 'lightGrey' }} className='innerCard'>
              <h2>hello</h2>
              
            </Card>
        </Card>
      </div>
    </div>
  );
}

export default App;
