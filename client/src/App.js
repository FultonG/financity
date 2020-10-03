import React, { useState } from 'react';
import TeacherApp from './Apps/Teacher';
import UnauthorizedApp from './Apps/UnAuth';

function App() {
  // const [user, setUser] = useState({role: 'teacher'});
  
  const [user, setUser] = useState(null);
  return (
    <>
    {user && user.role === 'teacher' && (
      <TeacherApp/>
    )}
    {user && user.role === 'student' && (
      <h1>student</h1>
    )}
    {user === null && (
    //  <h1>unauth</h1>
      <UnauthorizedApp/>
    )}
    </>
  );
}

export default App;
