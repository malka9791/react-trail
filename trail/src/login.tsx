import { useContext, useEffect, useState } from "react";
import { userContext } from "./context/userContext";
import axios from "axios";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
const Login = () => {


  // const {  } = useContext(userContext);
  const  {SetMyId}=useContext(userContext);
  const [name, SetMyName] = useState<string>("");
  const [Flag,SetFlag]=useState(false);
  const checkPost = async (name:string) => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users?username=${name}`
      );
     const data = res.data;
      if (data.length > 0) {
        SetMyId(data[0].id);
        SetFlag(false)
      } else {
       SetFlag(true);
       SetMyId(-1)
        return null;
      }
    } catch {
      console.log("error");
    }
  };
  return (
    <>
   <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="press name" variant="standard" value={name}
        onChange={({ target }) => {
          SetMyName(target.value);
        }}/>
      </Box>
      <br/>
         <Stack direction="row" spacing={2}>
      <Button   variant="outlined" onClick={()=>checkPost(name)}  endIcon={<SendIcon />}>Send</Button>
      <br />    
      </Stack>

        <>{
        Flag&&"The name not in the UsersList"} <br />
        </>

    </>
  );
};
export default Login;
