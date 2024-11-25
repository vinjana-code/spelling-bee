import React from 'react';
import exam1 from './json/test1.json';
import exam2 from './json/test2.json';
import exam3 from './json/test3.json';
import exam4 from './json/test4.json';
import exam5 from './json/test5.json';
import exam6 from './json/test6.json';
import exam7 from './json/test7.json';
import exam8 from './json/test8.json';
import exam9 from './json/test9.json';
import exam10 from './json/test10.json';
import exam11 from './json/test11.json';
import exam12 from './json/test12.json';
import exam13 from './json/test13.json';
import exam14 from './json/test14.json';
import exam15 from './json/test15.json';
import exam16 from './json/test16.json';
import exam17 from './json/test17.json';


const tests = [
  { id: 1, name: "Level 1", exams: exam1 },
  { id: 2, name: "Level 2", exams: exam2 },
  { id: 3, name: "Level 3", exams: exam3 },
  { id: 4, name: "Level 4", exams: exam4 },
  { id: 5, name: "Level 5", exams: exam5 },
  { id: 6, name: "Level 6", exams: exam6 },
  { id: 7, name: "Level 7", exams: exam7 },
  { id: 8, name: "Level 8", exams: exam8 },
  { id: 9, name: "Level 9", exams: exam9 },
  { id: 10, name: "Level 10", exams: exam10 },
  { id: 11, name: "Level 11", exams: exam11 },
  { id: 12, name: "Level 12", exams: exam12 },
  { id: 13, name: "Wonder level 1", exams: exam13 },
  { id: 14, name: "Wonder level 2", exams: exam14 },
  { id: 15, name: "Wonder level 3", exams: exam15 },
  { id: 16, name: "Wonder level 4", exams: exam16 },
  { id: 17, name: "Wonder level 5", exams: exam17 }
];

const Dashboard = ({ onSelectTest }) => {
  return (
    <div>
      <h1>Spelling Bee Dashboard</h1>
      {tests.map((test) => (
        <button key={test.id} onClick={() => onSelectTest(test)}>
          {test.name}
        </button>
      ))}
    </div>
  );
};

export default Dashboard;
