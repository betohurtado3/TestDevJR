import React from "react"
import { useEffect, useState } from "react"
import { Button, Modal, Table, Card, Form } from 'react-bootstrap'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
  /// ----------- POST METHOD-----------
  const [estado, setEstado] = useState('')

  const handleChange = event => {
    setEstado({ name: event.target.value });
  }

  const handleSubmit = () => {
    const data = {
      id: estado.name,
      title: estado.title,
      completed: estado.completed

    };
    const insertar = axios.post(`https://jsonplaceholder.typicode.com/posts`, { data })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

      console.log(insertar)
  }

  ///----------------------------------------- users -------------------------------------------------------
  const usersUrl = 'https://jsonplaceholder.typicode.com/users'
  const [usuarios, setUsuarios] = useState()
  const [usuario, setUsuario] = useState({"id": '',"name": "","username": "","email": ""})
  const [showUser, setShowUser] = useState(false);

  const handleShowUser = (singleUser) => {
    setUsuario(singleUser)
    setShowUser(true)
  };

  const handleCloseUser = () => setShowUser(false);

  const fetchApi = async () => {
    const response = await fetch(usersUrl)
    const responseJSON = await response.json()
    setUsuarios(responseJSON)
  }

  /// ------------------------ TODOS ------------------------------------------
  const [showTodos, setShowTodos] = useState(false);
  const handleCloseTodos = () => setShowTodos(false);

  const handleShowTodos = () => {
    setShowTodos(true)
  }

  const [todos, setTodos] = useState()
  const fetchTodos = async (userId) => {
    const responseTodos = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
    const responseTodosJSON = await responseTodos.json()
    setTodos(responseTodosJSON)
  }

  //// ----------------------------- Post-------------------------------------------------------
  const [showPosts, setShowPosts] = useState(false);
  const handleClosePosts = () => setShowPosts(false);

  const handleShowPosts = () => {
    setShowPosts(true)
  };

  const [posts, setPosts] = useState()
  const fetchPosts = async (userId) => {
    const responsePost = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    const responsePostJSON = await responsePost.json()
    setPosts(responsePostJSON)
  }

  //// ---------------------------- Comments -------------------------------------------------------
  const [showComments, setShowComments] = useState(false);
  const handleCloseComments = () => setShowComments(false);

  const handleShowComments = () => {
    setShowComments(true)
  };

  const [comments, setComments] = useState()
  const fetchComments = async (postId) =>{
    const responseComment = await fetch(`https://jsonplaceholder.typicode.com/post/${postId}/comments`)
    const responseCommentJSON = await responseComment.json()
    setComments(responseCommentJSON)
  }
  //// --------------------------Form---------------------------
  const [showForm, setShowForm] = useState(false);
  const handleCloseForm = () => setShowForm(false);

  const handleShowForm = () =>{
    setShowForm(true)
  }

  ////// Form



  useEffect(() => {
    fetchApi()
  }, []);

  return (
    <div className="App">
  <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <form className="mb-3" onSubmit={handleSubmit}>
          <label>
            Id:
            <input  type="number" name="id" onChange={handleChange} />
            Titulo:
            <input type="text" name="title" onChange={handleChange} />
            completed:
            <input type="checkbox" name="completed" onChange={handleChange} />
          </label>
          <button type="submit">Mandar</button>
        </form>
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseForm}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUser} onHide={handleCloseUser}>
        <Modal.Header closeButton>
          <Modal.Title>{usuario.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>UserName</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
              <td>{usuario.username}</td>
              <td>{usuario.email}</td>
            </tr>
          </tbody>
        </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={()=> {fetchPosts(usuario.id); handleShowPosts(usuario);}}>
            Posts
          </Button>
          <Button variant="primary" onClick={()=> {fetchTodos(usuario.id); handleShowTodos()}}>
            Todos
          </Button>
        </Modal.Footer>
      </Modal>

    <Modal show={showTodos} onHide={handleCloseTodos}>
    <Modal.Header closeButton>
      <Modal.Title>Todos</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    { !todos ? 'Loading...' :
        todos.slice(0).reverse().map((singleTodos,index) =>{
            return(
              <div>
                <h6>
                  ID:{singleTodos.id} {singleTodos.title}
                </h6>
                <hr></hr>
              </div>)
        })
    }
    </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseTodos}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleShowForm}>
            Formulario
          </Button>
        </Modal.Footer>
    </Modal>

    <Modal show={showPosts} onHide={handleClosePosts}>
    <Modal.Header closeButton>
      <Modal.Title>Posts</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    { !posts ? 'Loading...' :
        posts.map( (singlePost,index) =>{
            return(
              <div>
                <h4>
                  Titulo: {singlePost.title}
                </h4>
                <Button variant="secondary" onClick={()=> {fetchComments(singlePost.id); handleShowComments();}}>
                  Comentarios
                </Button>
                <hr></hr>
              </div>)
        })
    }
    </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleShowPosts}>
            Posts
          </Button>
          <Button variant="primary" onClick={handleClosePosts}>
            Todos
          </Button>
        </Modal.Footer>
    </Modal>

    <Modal show={showComments} onHide={handleCloseComments}>
        <Modal.Header closeButton>
          <Modal.Title>Comentarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ !comments ? 'Loading' :
                  comments.map( (comment,index) =>{
                  return <tr style={{ color: 'black' }}>{comment.id}.- {comment.name}</tr>
                })
              }</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseComments}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    <Card style={{ width: '50rem',  marginLeft: '2rem', marginTop: '2rem' }}>
        <Table striped bordered hover>
        <tbody>
              { !usuarios ? 'Loading' :
                usuarios.map( (singleUser,index) =>{
                  return <tr onClick={()=> handleShowUser(singleUser)}><td style={{ color: 'blue' }}>{singleUser.name}</td></tr>
                })
              }
            </tbody>
        </Table>
      </Card>

    </div>
  );

}




export default App;


