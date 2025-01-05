import { type ReactElement, type FormEvent } from "react";
import { NavLink } from "react-router";
import styles from "./RegisterForm.module.css";
import { createUser } from "../../../server";
import { UserModel } from "../../../models";
import { ToastContainer,toast } from "react-toastify";

export const RegisterForm = (): ReactElement => {  

  const error = () => toast.error("Error creating user");

  const handleForm = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = Object.fromEntries(data.entries());
    const user: UserModel = {
      id: "", 
      email: formData.email as string,
      username: formData.username as string,
      name: formData.name as string,
      lastname: formData.lastname as string,
      password: formData.password as string,
    };
    const response = await createUser(user);    
    if(!response) {
      error();
    }
  }

  return (
    <form action="" onSubmit={handleForm} className={styles.login_form}>
      <ToastContainer />
      <h3 className={styles.title}>Register</h3>
      <div className={styles.inputs}>
        <label htmlFor="username" className={styles.input_label}>Username</label>
        <input
          type="text"
          name="username"
          placeholder="exampleuser123"
          className={styles.login_input}
        />

        <label htmlFor="password" className={styles.input_label}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className={styles.login_input}
        />
        <label htmlFor="name" className={styles.input_label}>Name</label>
        <input
          type="text"
          name="name"
          placeholder="John Eric"
          className={styles.login_input}
        />

        <label htmlFor="lastname" className={styles.input_label}>Lastname</label>
        <input
          type="text"
          name="lastname"
          placeholder="Morgan Smith"
          className={styles.login_input}
        />
        <label htmlFor="email" className={styles.input_label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@email.com"
          className={styles.login_input}
        />
      </div>

      <div className={styles.recover}>
        <div className={styles.remember}>
          <input type="checkbox" className={styles.remember_check}/>
          <p className={styles.remember_text}>Remember me</p>
        </div>
        <p>Forgot your password?</p>
      </div>

      <button>Register</button>

      <div className={styles.recruit}>
        <p className={styles.create_account}>
          Already have an account? <NavLink to={"/auth/login"}>Login here</NavLink>
        </p>
      </div>
    </form>
  );
};
