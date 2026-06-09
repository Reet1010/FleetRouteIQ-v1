import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/form.module.css"


function Login() {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { setUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await api.post("/auth/login", { email, password, });

        localStorage.setItem("user", JSON.stringify(res.data));

        setUser(res.data);

        navigate("/dashboard");
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
                required
            />

            <button>Login</button>
        </form>
    );
}

export default Login;