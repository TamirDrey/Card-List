import { toast } from "react-toastify";
import { useState } from "react";
import { checkEmail, checkPassword } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useLoginMutation } from "../store/services/auth-api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkPassword(password);
    return isEmailValid && isPasswordValid;
  };

  const handleLogin = async () => {
    await login({
      email: email,
      password: password,
    })
      .unwrap()
      .then((data) => {        
        if (data.user) {
          toast.success(`Welcome ${data.user.name}`);
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.data.messege);
      });
  };

  return (
    <AuthForm
      title="Login"
      fields={[
        { label: "Email", type: "email", value: email, setValue: setEmail },
        {
          label: "Password",
          type: "password",
          value: password,
          setValue: setPassword,
        },
      ]}
      validate={validate}
      onSubmit={handleLogin}
    />
  );
}

export default Login;
