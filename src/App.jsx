import Chat from "./chat/Chat"
import Detail from "./detail/Detail"
import List from "./list/List"
import Login from "./login/Login";

const App = () => {
  const user = false;

  return (
    <div className='container'>
      {user ? 
        <>
          <List></List>
          <Chat></Chat>
          <Detail></Detail>
        </> :
        <Login />
      }
    </div>
  )
}

export default App