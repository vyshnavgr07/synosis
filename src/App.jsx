import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import useFetchData from './hooks/useFetchData';
import { useSelector } from 'react-redux';
import ListTable from './pages/UsersList';
import AddUser from './pages/AddUser';
import DeleteModal from './components/DeleteModal';


function App() {
  const {loading, error } = useFetchData();
  const users = useSelector((state) => state.users.list);
  console.log(users,"userss")
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
