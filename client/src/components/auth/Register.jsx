import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from 'sweetalert'
import classes from '../../styles/Auth.module.css';

import { useAuth } from "../../providers/AuthProvider";


const Register = () => {

  const { register: signup } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();


  const registerOptions = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
        message: "Invalid email address"
      }
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  };

  const handleSignup = async ({ email, password, cnfrm_password }) => {

    try {
      await signup({ email, password, cnfrm_password });
      navigate("/");
    } catch (error) {
      swal({
        text: error.message,
        icon: "error"
      });
    }
  }
  // const handleRegistration = (data) => console.log(data);
  return (
    <div className={classes.loginContainer}>
      <div className={classes.cardContainer}>
        {/* <h3>SignIn</h3> */}
        <form onSubmit={handleSubmit(handleSignup)} >
          <div className={classes.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={classes.formControl}
              name="email"
              {...register('email', registerOptions.email)}
              aria-invalid={errors.email ? "true" : "false"}

            />
            <small className={classes.textDanger}>
              {errors?.email && errors.email.message}
            </small>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={classes.formControl}
              name="password"
              {...register('password', registerOptions.password)}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <small className={classes.textDanger}>
              {errors?.password && errors.password.message}
            </small>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              className={classes.formControl}
              name="cnfrm_password"
              {...register('cnfrm_password', registerOptions.password)}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <small className={classes.textDanger}>
              {errors?.cnfrm_password && errors.cnfrm_password.message}
            </small>
          </div>
          <div className={classes.formGroup}>
            <button className={classes.loginBtn}>
              <span>Register</span>
            </button>
          </div>
          <Link to="/login" >Login?</Link>
        </form>
      </div>
    </div>
  )

}

export default Register;