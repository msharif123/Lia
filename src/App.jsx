import HelpPage from './components/HelpPage'
import { helpData } from './data/helpData'
import './App.css'

function App() {
  return (
    <HelpPage helpData={helpData} />
  )
}

export default App
