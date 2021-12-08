import React from "react";
import Masonry from "react-masonry-css";
import { Spinner } from "reactstrap";
import NoteAccordion from "./NoteAccordion";
const Note = ({ isDataLoaded, notesList, handleChange }) => {
  const open = false;

  const renderNotes = () => {
    if (isDataLoaded) {
      return (
        <Masonry
          breakpointCols={4}
          className="note"
          columnClassName="noteColumn"
        >
          {notesList.map((note) => {
            return (
              <NoteAccordion
                title={note.title}
                body={note.body}
                open={open}
                id={note._id}
                key={note._id}
                handleChange={handleChange}
              />
            );
          })}
        </Masonry>
      );
    } else {
      return (
        <>
          <Spinner color="primary" type="grow">
            Loading...
          </Spinner>{" "}
          <Spinner color="secondary" type="grow">
            Loading...
          </Spinner>{" "}
          <Spinner color="success" type="grow">
            Loading...
          </Spinner>{" "}
          <Spinner color="danger" type="grow">
            Loading...
          </Spinner>{" "}
          <Spinner color="warning" type="grow">
            Loading...
          </Spinner>{" "}
          <Spinner color="info" type="grow">
            Loading...
          </Spinner>{" "}
          <Spinner color="light" type="grow">
            Loading...
          </Spinner>{" "}
          <Spinner color="dark" type="grow">
            Loading...
          </Spinner>
        </>
      );
    }
  };

  return <div className="middle">{renderNotes()}</div>;
};

export default Note;
