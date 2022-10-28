import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import AddBlogForm from './components/addBlogForm'
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [errorMessage, setErrorMessage] = useState(null)
  const [notifStatus, setNotifStatus] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [user, setUser] = useState(null)
  const [newBlogVisible, setNewBlogVisible] = useState(false)

  useEffect(() => {
      blogService.getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
    
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // ...

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(user)
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } 

    catch (exception) {
      setErrorMessage('wrong credentials')
      setNotifStatus("red")
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000);
    }
  }

  const handleLogout = (event) =>{
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = (event) =>{
    event.preventDefault()
    
    const newBlog = {
      title:  title,
      author: author,
      url: url,
      likes: 0
  }
    blogService
      .create(newBlog)    
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotifStatus("green")
        setErrorMessage(`${returnedBlog.title.toString()} added to blogs`)
        setTimeout(() => {
            setNotifStatus('')
            setErrorMessage(null)
            setTitle('')
            setAuthor('')
            setUrl('')
        }, 4000)
      })
      .catch(error => {
        setNotifStatus("red")
        setErrorMessage(error.response.data)
        setTimeout(() => {
            setNotifStatus('')
            setErrorMessage(null)
        }, 4000)
      })
  
    }


  const updateBlog = id => {
        
        const likedBlog = blogs.find(blog => blog.id === id)

        const newBlog = {
            title: likedBlog.title,
            author: likedBlog.author,
            url: likedBlog.url,
            user: likedBlog.user,
            likes: likedBlog.likes + 1
    }

        blogService
            .update(id, newBlog)
            .then(returnedBlog => {
                setBlogs(
                    blogs.map(blog => (blog.id === returnedBlog.id ? returnedBlog : blog))
                )
                setNotifStatus("green")
                setErrorMessage('Like received')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 4000)
            })
            .catch(error => {
                setNotifStatus("red")
                setErrorMessage(error.response.data)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 4000)
            })
    }

    const removeBlog = id => {
        
      const blogToRemove = blogs.find(blog => blog.id === id)

      if (window.confirm(`Delete ${blogToRemove.title}?`)){
        blogService
        .remove(blogToRemove.id)
        setErrorMessage(`${blogToRemove.title} removed`)}
          setTimeout(() => {
              setNotifStatus("green")
              setErrorMessage(null)
              window.location.reload(false)
          }, 4000)


  }

    const loginForm = () => {
      return (
        <div>
          <Notification message={errorMessage} notifStatus={notifStatus}/>
          <h1>Blog App</h1>
          <div>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
            />
          </div>
        </div>
      )
    }
    
    loginForm.propTypes = {
      handleLogin: PropTypes.func.isRequired,
      handleUsernameChange: PropTypes.func.isRequired,
      handlePasswordChange: PropTypes.func.isRequired,
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired
    }

    const addBlogForm = () => {
      const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
      const showWhenVisible = { display: newBlogVisible ? '' : 'none' }
  
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setNewBlogVisible(true)}>Add new blog</button>
          </div>
          <div style={showWhenVisible}>
            <AddBlogForm
              title={title}
              author={author}
              url={url}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              addBlog={addBlog}
            />
            <button onClick={() => setNewBlogVisible(false)}>Cancel</button>
          </div>
        </div>
      )
    }

  if (user === null) {
    return (
      loginForm()
    )
  }

  
  return (
    <div>
      <Notification message={errorMessage} notifStatus={notifStatus}/>
      <p><strong>{user.username}</strong> logged in, Welcome!</p>
      <form onSubmit={handleLogout}>
        <button type='submit'>Logout</button>
      </form>< br/>
      <h2>Blogs:</h2>
      {blogs
      .sort((a, b) => a.likes < b.likes ? 1 : -1)
      .map(blog =>
        <Blog key={blog.id} title={blog.title} author={blog.author} url={blog.url} likes={blog.likes} id={blog.id} updateBlog={updateBlog} removeBlog={removeBlog}/>
      )}
      {addBlogForm()}
    </div>
  )
  }

export default App