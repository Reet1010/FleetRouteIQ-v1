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
        try {

            const res = await api.post("/auth/login", { email, password, });

            localStorage.setItem("user", JSON.stringify(res.data));

            setUser(res.data);

            navigate("/dashboard");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div>

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

            <p>
                Don't have an account?
                <button
                    type="button"
                    onClick={() =>
                        navigate("/register")
                    }
                >
                    Register Here
                </button>
            </p>
        </div>

    );
}

export default Login;