import Chat from "./chat/Chat"
import Detail from "./detail/Detail"
import List from "./list/List"

const App = () => {
  return (
    <div className='container'>
      <List></List>
      <Chat></Chat>
      <Detail></Detail>
    </div>
  )
}

export default App