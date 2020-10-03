import React, { useState } from 'react';
import TeacherApp from './Apps/Teacher';
function App() {
  const [user, setUser] = useState({role: 'teacher'});
  return (
    <>
    {user && user.role === 'teacher' && (
      <TeacherApp/>
    )}
    {user && user.role === 'student' && (
      <h1>student</h1>
    )}
    {user === null && (
     <h1>unauth</h1>
    )}
    </>
  );
}

export default App;
