import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ListTable from './pages/UsersList';
import AddUser from './pages/AddUser';
import useFetchData from "./hooks/useFetchData";



function App() {
  const {loading}=useFetchData()

return (
<>
<BrowserRouter>
<Routes>
<Route path='/' element={<ListTable/>}/>
<Route path='user/add' element={<AddUser/>}/>
<Route path='user/add/:id' element={<AddUser/>}/>
</Routes>
</BrowserRouter>
</>
  )
}


export default App
