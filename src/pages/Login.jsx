import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import Logo from "../components/Logo";
import useLogin from "../features/authentication/useLogin";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {handleLogin, isLoading, error} = useLogin(); 

    const handleSubmit = (e)=> {
        e.preventDefault();
        if(!email || !password) return;
        handleLogin({email, password});
    }
    

    return (
        <div className="flex flex-col gap-5 py-10 px-6 rounded-md shadow-md w-[500px] m-auto bg-white lg:w-[800px] lg:px-20">
            <header className="text-center space-y-1">
                <div className="w-[150px] mx-auto">
                    <Logo/>
                </div>
                <h1 className="text-4xl font-bold mt-4 lg:text-5xl">Welcome Back</h1>
                <p className="text-sm">Sign in to your DevSphere account</p>
            </header>
            <main className="">
                <form className="flex flex-col gap-4 lg:gap-8" onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input 
                        type="email" 
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-0"
                        id="email"
                        onChange={(e)=> setEmail(e.target.value)} 
                        disabled={isLoading}
                        /> 
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                        type="password" 
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-0"
                        id="password"
                        onChange={(e)=> setPassword(e.target.value)}
                        disabled={isLoading}
                        /> 
                    </div>
                    <Button type="primary" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Log in"}
                    </Button>
                </form>
                {error && <p className="text-red-400">{error}</p>}            
            </main>    
            <p className="italic">
                Don't have an account? 
                <Link to="/signUp">
                    <span className="text-blue-700"> Sign Up</span>                
                </Link> 
            </p>
        </div>
    )
}

export default Login
