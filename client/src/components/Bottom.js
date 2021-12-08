import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
} from "reactstrap";
import { getToken, instanceAxios } from "../helpers";

const Bottom = ({ handleChange }) => {
  const [noteBody, setnoteBody] = useState("");
  const [noteTitle, setnoteTitle] = useState("");
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const addNewNote = () => {
    instanceAxios
      .post(
        "http://localhost:3080/api/notes/add",
        {
          title: noteTitle,
          body: noteBody,
        },
        { headers: { authtoken: getToken() } }
      )
      .then((res) => {
        toggleModal();
        handleChange();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bottom">
      <Button active block color="dark" outline size="sm" onClick={toggleModal}>
        Add New Note!
      </Button>
      <Modal
        isOpen={modal}
        backdrop={false}
        centered
        fullscreen="md"
        scrollable
        size="lg"
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>Add a new note!</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup floating>
              <Input
                name="title"
                placeholder="title"
                bsSize="sm"
                onChange={(event) => setnoteTitle(event.target.value)}
              />
              <Label for="noteTitle">Title</Label>
              <FormFeedback>Sweet! That title is good!</FormFeedback>
              <FormText>Don't forget this note after saving :P</FormText>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="noteBody"
                name="text"
                type="textarea"
                placeholder="text"
                onChange={(event) => setnoteBody(event.target.value)}
              />
              <Label for="noteBody">Content</Label>
            </FormGroup>
            <Button
              color="success"
              onClick={() => {
                addNewNote();
              }}
            >
              Submit
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <p>
            <i>
              your data is saved even if you accidently close this window :)
            </i>
          </p>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Bottom;
