import Chat from "./chat/Chat"
import Detail from "./detail/Detail"
import List from "./list/List"
import Login from "./login/Login";
import Notification from "./notification/Notification";

const App = () => {
  const user = true;

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
      <Notification />
    </div>
  )
}

export default App