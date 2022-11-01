import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Http from './components/Http';
import DefaultLayout from './components/DefaultLayout';
import Courses from './pages/Courses';
import Blogs from './pages/Blogs';
import AddCourse from './pages/AddCourse';
import CourseDetail from './pages/CourseDetail';

function App() {

  return (
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
        <Route path="add-course" element={
          <DefaultLayout>
            <AddCourse />
          </DefaultLayout>
        }
        />
        <Route path="course/:id" element={
          <DefaultLayout>
            <CourseDetail />
          </DefaultLayout>
        }
        />
      </Routes>
    </Router>
  );
}

export default App;
