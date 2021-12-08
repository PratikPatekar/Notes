import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [invalidUser, setInvalidUser] = useState(false);
  let history = useHistory();

  const registerUser = () => {
    Axios.post(`http://localhost:3080/api/user/register`, {
      name: name,
      email: email,
      password: password,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          history.push("/login");
        }
      })
      .catch((err) => {
        setInvalidUser(true);
        console.log(err);
      });
  };

  const handleInput = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  return (
    <div className="loginPage">
      {invalidUser ? <Alert color="danger">Invalid Request!</Alert> : " "}
      <Form inline className="loginForm">
        <FormGroup floating>
          <Input
            bsSize="sm"
            id="name"
            name="name"
            placeholder="UserName"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
              handleInput();
            }}
          />
          <FormText>It's Just a fancy word for Name :P</FormText>
          <Label for="email">UserName</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            valid={emailIsValid && email !== ""}
            invalid={!emailIsValid}
            bsSize="sm"
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              handleInput();
            }}
          />
          <FormText>Make sure you choose Unique Email Address</FormText>
          <Label for="email">Email</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            bsSize="sm"
            id="password"
            name="password"
            placeholder="Password"
            type="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Label for="password">Password</Label>
        </FormGroup>
        <Button color="success" onClick={registerUser}>
          Register!
        </Button>
      </Form>
    </div>
  );
};

export default Register;
