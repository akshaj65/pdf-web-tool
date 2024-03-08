import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import PrivateRoute from './PrivateRoute';
import AuthProvider from './providers/AuthProvider';
import PageLayout from './layout/PageLayout';
import PageNotFound from './PageNotFound';


import './App.css';
import Register from './components/auth/Register';
import PdfProvider from './providers/pdfProvider';
import FileList from './components/FileList';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <PdfProvider>
            <Routes>
              <Route path="/" element={<PageLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/*Add routes that require authentication  */}
                <Route element={<PrivateRoute />}>
                  <Route index element={<Home />} />
                  <Route path="user/files" element={<FileList />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </PdfProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
