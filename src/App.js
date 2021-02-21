import './App.css';
import Calendar from './components/Calendar/Calendar';

function App() {
  const date = new Date();

  return (
    <div className="app">
      <Calendar date={date}/>
    </div>
  )
}

export default App;
