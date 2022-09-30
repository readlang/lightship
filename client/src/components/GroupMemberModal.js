import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMember } from "../slices/membersSlice";
import { loadErrors } from '../slices/errorsSlice'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function GroupMemberModal({groupId}) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit() {
    if (username.trim() !== "") {
    fetch(`/users/search/${username.trim()}`)
    .then(resp => resp.json())
    .then(data=>{
        data ? dispatch(addMember(groupId, data.id)) : dispatch(loadErrors(["The friend search didn't find anyone. Try again."]))
    })
    setUsername("")
    setShow(false)
    }
  }

  return (
    <>
      <Button variant="outline-primary" size="sm" onClick={handleShow}>
      <h4><strong>+</strong></h4>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a friend to the group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Enter their Username</Form.Label>
                    <Form.Control
                        type="input"
                        placeholder="UsernameExample"
                        autoFocus 
                        value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Friend
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GroupMemberModal;
