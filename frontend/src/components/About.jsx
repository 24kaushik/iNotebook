import React from 'react';

const About = () => {
  return (
    <div className='container'>
      <h1 className='my-2'>About iNotebook</h1>
      <div className="container">
        <h3 className="mt-4">What is iNotebook?</h3>
        <p className='px-2'>iNotebook, A notebook on the cloud. Tired of storing your notes physically on a paper and losing them? <br /> Well, not anymore. iNotebook allows you to store all your notes on the cloud so you can never lose them. </p>
        <h4>Here is what you can do using iNotebook:</h4>
        <ul>
          <li>Create new Notes.</li>
          <li>Edit existing Notes.</li>
          <li>Delete existing Notes.</li>
        </ul>
        <h3 className="my-2">How secure is it?</h3>
        <p className="px-2">Well, the first question that comes to everyone's mind before putting/storing their data into any cloud based service is <br /> "How secure is my data? Can someone else access it?" <br /> The answer is "NO". <u>iNotebook stores all your notes in a secured database</u> and the only way someone can access that is through a valid email and password. A password only known by you. Nobody else can access your notes. <br />
        <u>Even the password is encrypted and then stored to the database</u>. So even if somehow someone gets access to the database(very very unlikely to happen) then too he would not get your password as its encrypted.</p>
      </div>
    </div>
  )
}

export default About;
