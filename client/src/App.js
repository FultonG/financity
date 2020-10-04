import React, { useState } from 'react';
import TeacherApp from './Apps/Teacher';
import StudentApp from './Apps/Student';
import UnauthorizedApp from './Apps/Unauth';

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
    {user && user.role === 'teacher' && (
      <TeacherApp/>
    )}
    {user && user.role === 'student' && (
      <StudentApp/>
    )}
    {user === null && (
      <UnauthorizedApp setUser={setUser}/>
    )}
    </>
  );
}

export default App;
