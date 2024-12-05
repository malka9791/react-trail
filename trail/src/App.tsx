// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Posts from "./posts";
import UserProvider from "./context/userContext";
import Login from "./login";
import AddUser from "./AddfieldArray";

function App() {
  return (
    <>
      {/* <UserProvider>
      <>
      <Login />
      <Posts/>
      </>
      </UserProvider> */}
      <AddUser />
    </>
  );
}

export default App;
