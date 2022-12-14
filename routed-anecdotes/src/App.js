import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from "react-router-dom"

import { useField } from './hooks/index'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  return (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <div>has {anecdote.votes} votes</div>
    <div>for more info <a href={anecdote.info}>{anecdote.info}</a></div>
  </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Notification = (props) =>{
  let notif = props.notif
  if (!(notif === "")){
    return(
      <div>
        <h3>{notif}</h3>
      </div>
    )
  }
}

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const nav = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    nav('/')

  }
  
  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  const inputStyle = {
    fontSize:18,
    marginBottom: 4,
    marginRight:5,
    padding: 5
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input style={inputStyle} name='content' {...content} reset={null} placeholder="Content..."/>
        </div>
        <div>
          <input style={inputStyle} name='author' {...author} reset={null} placeholder="Author..."/>
        </div>
        <div>
          <input style={inputStyle} name='info' {...info} reset={null} placeholder="Url..." />
        </div>
        <input style={inputStyle} type='submit' value='Create'/>
        <input style={inputStyle} type='button'  value='Reset' onClick={resetFields} />
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  
  const padding = {
    marginRight: 5,
    padding:5,
    border:'solid',
    borderColor:'black',
    borderWidth:1,
    backgroundColor:"lightgrey",
    fontSize:18,
    marginBottom: 4,
  }

  const [notification, setNotification] = useState('')
  
  const handleNotification = notif => {
    setNotification(notif)
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    handleNotification("'"+anecdote.content+"'"+" created!")
    setTimeout(() => handleNotification(""), 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notif={notification}/>
      <Router>
        <div>
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/create">Create new</Link>
          <Link style={padding} to="/about">About</Link>
        </div>

        <Routes>
          <Route path="/:id" element={<Anecdote anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateNew addNew={addNew}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        </Routes>

        <div>
        <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App
