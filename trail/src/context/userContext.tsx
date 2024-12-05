import { createContext, ReactElement, useState } from "react";

type userContextType = {
  id:number;
  SetMyId:(id:number)=>void;
};
export const userContext = createContext<userContextType>({

  id:-1,
  SetMyId:(_:number)=>{}
});
function UserProvider({ children }: { children: ReactElement }) {
  const [id,SetId]=useState<number>(-1);
  const SetMyId=(id:number)=>{
    SetId(id);
  }

  return (
    <userContext.Provider value={{ id,SetMyId}}>
      {children}
    </userContext.Provider>
  );
}
export default UserProvider;
