import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getToken, instanceAxios } from "../helpers";
const NoteAccordion = ({ title, body, open, id, handleChange }) => {
  const [isOpen, setIsOpen] = useState(open);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [noteBody, setnoteBody] = useState(body);
  const [noteTitle, setnoteTitle] = useState(title);

  const updateNote = () => {
    instanceAxios
      .put(
        `/api/notes/update`,
        {
          id: id,
          title: noteTitle,
          body: noteBody,
        },
        { headers: { authtoken: getToken() } }
      )
      .then((res) => {
        toggle();
        handleChange();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNote = () => {
    instanceAxios
      .delete(`/api/notes/delete`, {
        headers: { authtoken: getToken(), dataid: id },
      })
      .then((res) => {
        toggle();
        handleChange();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="notecard">
      <Card outline onClick={toggle}>
        <CardBody>
          <CardTitle tag="h6">{title}</CardTitle>
          <CardText>{body}</CardText>
        </CardBody>
      </Card>
      <Modal
        isOpen={isOpen}
        backdrop={false}
        centered
        fullscreen="md"
        size="lg"
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup floating>
              <Input
                name="title"
                placeholder="title"
                onChange={(event) => setnoteTitle(event.target.value)}
                value={noteTitle}
              />
              <Label for="noteTitle">Title</Label>
              <FormText>Don't forget this note after saving :P</FormText>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="noteBody"
                name="text"
                type="textarea"
                placeholder="text"
                value={noteBody}
                onChange={(event) => setnoteBody(event.target.value)}
              />
              <Label for="noteBody">Content</Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              updateNote();
            }}
          >
            Update!
          </Button>
          <Button
            color="danger"
            onClick={() => {
              deleteNote();
            }}
          >
            Delete!
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default NoteAccordion;
