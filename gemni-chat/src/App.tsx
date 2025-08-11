
import './App.css'
import Sidebarbox from './components/Sidebarbox'
import ChatBox from './components/ChatBox'


function App() {


  return (
    <div className='flex flex-row h-screen bg-[#1e1b25] text-white' >
   
      <Sidebarbox  />

      
      <div className='flex-1 flex flex-col'>
     
      
      <ChatBox/>
     </div>
      </div>
   
  
  )
}

export default App
