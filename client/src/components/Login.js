import React, { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import Axios from "axios";
import { useHistory } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [password, setPassword] = useState("");
  const [invalidUser, setInvalidUser] = useState(false);
  let history = useHistory();

  const loginUser = () => {
    Axios.post(`/api/user/login`, {
      email: email,
      password: password,
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("authtoken", res.headers.authtoken);
          localStorage.setItem(
            "authtoken-expiration",
            Date.now() + 2 * 60 * 60 * 1000
          );
          setInvalidUser(false);
          history.push("/");
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
      {invalidUser ? (
        <Alert color="danger">Username/Password is incorrect</Alert>
      ) : (
        " "
      )}
      <Form inline className="loginForm">
        <FormGroup floating>
          <Input
            valid={emailIsValid && email !== ""}
            invalid={!emailIsValid && email !== ""}
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
        <Button color="success" onClick={loginUser}>
          Login!
        </Button>
        <h6>
          <a href="/register">Create an account!</a>
        </h6>
      </Form>
    </div>
  );
};

export default Login;
