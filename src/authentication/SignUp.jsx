import { Button } from "../ui/Button";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";
import SpinnerMini from "../ui/SpinnerMini";
import { Link } from "react-router-dom";

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-color);
`;

const Form = styled.form`
  background-color: var(--background-color);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--black-color);
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--secondary-color);
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-color);
`;

const SignUp = () => {
  const { signup, isLoading } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    );
  }

  return (
    <SignUpContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Sign Up</Title>
        <div>
          <Input
            type="text"
            id="fullName"
            placeholder="Fullname"
            {...register("fullName", { required: "This field is required" })}
          />
          <p>{errors?.fullName?.message}</p>
        </div>

        <div>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
          <p>{errors?.email?.message}</p>
        </div>

        <div>
          <Input
            id="password"
            type="password"
            placeholder="Password (min 8 characters)"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
          <p>{errors?.password?.message}</p>
        </div>

        <div>
          <Input
            type="password"
            id="passwordConfirm"
            placeholder="Confirm Password"
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
          <p>{errors?.passwordConfirm?.message}</p>
        </div>

        <div>
          <Button type="submit">
            {/* {isLoading ? <SpinnerMini /> : ""} Sign Up */}
            {isLoading ? <SpinnerMini /> : "Sign Up"}
          </Button>
          <p style={{ marginTop: "10px" }}>
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </p>
        </div>
      </Form>
    </SignUpContainer>
  );
};

export default SignUp;
