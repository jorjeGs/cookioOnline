import './App.css'
import Login from './pages/Login';
import Home from './pages/Home';
import Feed from './pages/Feed';
import CreateRecipe from './pages/CreateRecipe';
import Account from './pages/Account';
import ProtectRoute from './components/ProtectRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
//we can create a component who provides the user to all the components of the app instead of passing it as a prop 
import { UserContextProvider } from './context/UserContext';

function App() {
  
  return (
    <div className='App'>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path='login' element={<Login /> } />
            <Route element={<ProtectRoute redirectTo='/login' />}>
              <Route path='home/*' element={<Home />}>
                <Route index element={<Feed />} />
                <Route path='feed' element={<Feed />} />
                <Route path='create' element={<CreateRecipe />} />
                <Route path='profile' element={<Account />} />
                <Route path='*' element={<NotFound />} />
              </Route> 
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;