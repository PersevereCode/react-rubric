import logo from './logo.svg';
import './App.css';
import Section from './components/Section';
import Switch from '@mui/material/Switch';
import RUBRIC from './rubric.json'

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
      {/* <Section/>
      <Section/> */}
    </div>
  );
}

export default App;
