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
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { userSchemaValidation } from "../Validations/UserValidations";
import { UpdateUser as userData } from "../Feature/UserSlice";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const { user_email, user_name, user_password } = useParams();
  const [name, setName] = useState(user_name);
  const [email] = useState(user_email);
  const [password, setPassword] = useState(user_password);
  const [confirmPassword, setConfirmPassword] = useState(user_password);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
    defaultValues: {
      name: user_name,
      email: user_email,
      password: user_password,
      confirmPassword: user_password,
    },
  });

  const handelUpdate = (data) => {
    dispatch(
      userData({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    );
    alert("User Updated Successfully!");
    navigate("/register");
  };

  return (
    <Container fluid>
      <Row className="formrow">
        <Col className="columndiv1">
          <Form className="div-form" onSubmit={handleSubmit(handelUpdate)}>
            <section className="form">
              <FormGroup className="form-group">
                <input
                  type="text"
                  className="name"
                  value={name}
                  {...register("name", {
                    onChange: (e) => setName(e.target.value),
                  })}
                />
                <p className="error">{errors.name?.message}</p>
              </FormGroup>

              {/* Email identifies the user, so it cannot be changed */}
              <FormGroup className="form-group">
                <input
                  type="email"
                  className="email"
                  readOnly
                  value={email}
                  {...register("email")}
                />
                <p className="error">{errors.email?.message}</p>
              </FormGroup>

              <FormGroup className="form-group">
                <input
                  type="password"
                  className="password"
                  value={password}
                  {...register("password", {
                    onChange: (e) => setPassword(e.target.value),
                  })}
                />
                <p className="error">{errors.password?.message}</p>
              </FormGroup>

              <FormGroup className="form-group">
                <input
                  type="password"
                  className="ConfirmPassword"
                  value={confirmPassword}
                  {...register("confirmPassword", {
                    onChange: (e) => setConfirmPassword(e.target.value),
                  })}
                />
                <p className="error">{errors.confirmPassword?.message}</p>
              </FormGroup>

              <Button color="primary" className="button" type="submit">
                Update
              </Button>
            </section>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateUser;