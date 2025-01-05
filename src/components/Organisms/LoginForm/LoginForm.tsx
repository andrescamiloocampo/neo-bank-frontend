import { type ReactElement, type FormEvent} from "react";
import styles from "./LoginForm.module.css";
import { NavLink,useNavigate } from "react-router";
import { loginUser } from "../../../server/auth/loginUser";

export const LoginForm = (): ReactElement => {

  const navigate = useNavigate();  

  const handleForm = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const currentFormData = {
      username: data.get("username") as string,
      password: data.get("password") as string,
    };    

    const { username, password } = currentFormData;
    const response = await loginUser(username, password) ?? null;
    
    if(response) {
      sessionStorage.setItem("JWT_TOKEN",response.token)
      sessionStorage.setItem("username",response.username)
      navigate("/dashboard")
    }    
  }
  
  return (
    <form action="" onSubmit={handleForm} className={styles.login_form}>
      <h3 className={styles.title}>Login</h3>
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
      </div>

      <div className={styles.recover}>
        <div className={styles.remember}>
          <input type="checkbox" className={styles.remember_check}/>
          <p className={styles.remember_text}>Remember me</p>
        </div>
        <p>Forgot your password?</p>
      </div>

      <button>Login</button>

      <div className={styles.recruit}>
        <p className={styles.create_account}>
          Don't have an account? <NavLink to={"/auth/register"}>Register here</NavLink>
        </p>
      </div>
    </form>
  );
};
