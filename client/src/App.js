import React, { useState } from 'react';
import TeacherApp from './Apps/Teacher';
import UnauthorizedApp from './Apps/Unauth';

function App() {
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
      <UnauthorizedApp/>
    )}
    </>
  );
}

export default App;
