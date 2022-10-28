import { useState } from 'react'

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({ title, author, url, likes: 0 })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id='title'
            placeholder='Title of the blog...'
          />
        </div>
        <div>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id='author'
            placeholder='Author of the blog...'
          />
        </div>
        <div>
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id='url'
            placeholder='Url of the blog...'
          />
        </div>
        <button id='create-butto' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlogForm