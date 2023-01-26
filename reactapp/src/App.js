import './css/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Http from './components/Http';
import DefaultLayout from './components/DefaultLayout';
import Courses from './pages/Courses';
import Blogs from './pages/Blogs';
import AddCourse from './pages/AddCourse';
import CourseDetail from './pages/CourseDetail';
import Learning from './pages/Learning';
import { Provider } from 'react-redux';
import store from './utility/store';
import EditCourse from './pages/EditCourse';

const AdminRoute = ({ element, ...rest }) => {
  if (localStorage.getItem('role') !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return element
}

const AuthRoute = ({ element, ...rest }) => {
  if (localStorage.getItem('access_token') === null) {
    return <Navigate to="/" replace />;
  }
  return element
}

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
          />
          <Route path="courses" element={
            <DefaultLayout>
              <Courses />
            </DefaultLayout>
          }
          />
          <Route path="blogs" element={
            <DefaultLayout>
              <Blogs />
            </DefaultLayout>
          }
          />
          <Route path="course/:id" element={
            <DefaultLayout>
              <CourseDetail />
            </DefaultLayout>
          }
          />
          {/* admin route */}
          <Route path="add-course" element={
            <AdminRoute
              element={
                <DefaultLayout>
                  <AddCourse />
                </DefaultLayout>
              }
            />
          }
          />
          {/* auth route */}
          <Route path="course/:id/edit" element={
            <AuthRoute
              element={
                <DefaultLayout>
                  <EditCourse />
                </DefaultLayout>
              }
            />
          }
          />
          <Route path="learning/:id" element={
            <AuthRoute
              element={
                <DefaultLayout>
                  <Learning />
                </DefaultLayout>
              }
            />
          }
          />
          {/* other route */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
