import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { userSchemaValidation } from "../Validations/UserValidations";
import { addUser, deletUser } from "../Feature/UserSlice";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const userlist = useSelector((state) => state.users.value) || [];

  const onSubmit = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    dispatch(addUser(userData));
    alert("Registration successful!");
    reset();
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleDelete = (email) => {
    dispatch(deletUser(email));
  };

  return (
    <Container fluid className="container">
      <Row className="formrow">
        <Col className="columndiv1">
          <Form
            className="div-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className="form">
              <FormGroup className="form-group">
                <input
                  type="text"
                  className="name"
                  placeholder="Enter your name..."
                  value={name}
                  {...register("name", { onChange: (e) => setName(e.target.value) })}
                />
                <p className="error">{errors.name?.message}</p>
              </FormGroup>

              <FormGroup className="form-group">
                <input
                  type="email"
                  className="email"
                  placeholder="Enter your email..."
                  value={email}
                  {...register("email", { onChange: (e) => setEmail(e.target.value) })}
                />
                <p className="error">{errors.email?.message}</p>
              </FormGroup>

              <FormGroup className="form-group">
                <input
                  type="password"
                  className="password"
                  placeholder="Enter your password..."
                  value={password}
                  {...register("password", { onChange: (e) => setPassword(e.target.value) })}
                />
                <p className="error">{errors.password?.message}</p>
              </FormGroup>

              <FormGroup className="form-group">
                <input
                  type="password"
                  className="ConfirmPassword"
                  placeholder="Confirm your password..."
                  value={confirmPassword}
                  {...register("confirmPassword", { onChange: (e) => setConfirmPassword(e.target.value) })}
                />
                <p className="error">
                  {errors.confirmPassword?.message}
                </p>
              </FormGroup>

              <Button color="primary" className="button" type="submit">
                Register
              </Button>
            </section>
          </Form>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {userlist.length > 0 ? (
                userlist.map((user) => (
                  <tr key={user.email}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => handleDelete(user.email)}
                      >
                        Delete
                      </Button>{" "}

                      <Link
                        to={`/update/${user.email}/${user.name}/${user.password}`}
                      >
                        <Button color="primary">Update</Button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;