import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTracksForUser, addTrackToGroup } from "../slices/tracksSlice";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function GroupAddTrackModal({groupId}) {
  const [show, setShow] = useState(false);
  const user = useSelector((state)=>state.user.value)
  const tracks = useSelector((state)=>state.tracks.userTracks)
  
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getTracksForUser(user))
  },[dispatch, user])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit(trackId) {
    dispatch(addTrackToGroup(trackId, groupId))   
    handleClose()
  }

  return (
    <>
      <Button style={{float: "right"}} variant="outline-secondary" size="sm" onClick={handleShow}>
      Add my track
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select a track to share with the group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {tracks.map(track => (
              <div key={track.id}>
                <h4>{track.title}</h4> 
                <Button onClick={()=>handleSubmit(track.id)} >Add</Button>
              </div>
            ))}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GroupAddTrackModal;
