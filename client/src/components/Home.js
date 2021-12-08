import { getToken, instanceAxios } from "../helpers";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { isAuthenticated } from "../helpers";
import Bottom from "./Bottom";
import Note from "./Note";
import Top from "./Top";

const Home = () => {
  const [notesList, setnotesList] = useState([]);
  const [isDataLoaded, setisDataLoaded] = useState(false);
  const [handleDataChange, setHandleDataChange] = useState(false);
  const history = useHistory();
  const dataChange = () => setHandleDataChange(!handleDataChange);
  useEffect(() => {
    if (!isAuthenticated()) history.push("/login");
    else {
      setisDataLoaded(false);
      instanceAxios
        .get("http://localhost:3080/api/notes", {
          headers: {
            authtoken: getToken(),
          },
        })
        .then((result) => {
          setnotesList(result.data.data);
          setisDataLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [handleDataChange, history]);

  return (
    <>
      <Top />
      <Note
        isDataLoaded={isDataLoaded}
        notesList={notesList}
        handleChange={dataChange}
      />
      <Bottom handleChange={dataChange} />
    </>
  );
};

export default Home;
