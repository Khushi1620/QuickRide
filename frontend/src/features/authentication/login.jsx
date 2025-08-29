import '../../ResponsiveCSS/responsive.css';
import { useForm } from "react-hook-form";
import { loginUser } from '../../services/authServices';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

// Login schema
const loginSchema = z.object({
  emailId: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must contain at least 8 characters.")
});

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
          const result = await loginUser(data);
          console.log("Server responses: ", result.data);
          login(result.data.user);
          console.log(result?.data?.user?.role);
          if (result.data.user.role === "admin") {
            console.log("Admin logged in successfully...!!!");
            navigate('/admin/dashboard');
          } else {
            console.log("User logged in successfully...!!!");
            navigate('/user/dashboard');
          }
          alert(result.data.message || "User logged in successfully!");
        } catch(error) {
          console.log("Error in login frontend: "+ error.message);
          alert('Invalid credentials...!!!');
        }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-900 text-white">
      <div className="login_container border-2 border-indigo-500 rounded-xl px-10 py-12">
        <h1 className="text-5xl font-bold text-center mb-10 p-2">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          
          <input
            {...register("emailId")}
            className="input_field border-2 border-indigo-500 rounded-full py-4 bg-transparent w-100 px-4 outline-none"
            type="email"
            placeholder="Enter your email"
          />
          {errors.emailId && <p className="text-red-500">{errors.emailId.message}</p>}

          <input
            {...register("password")}
            className="input_field border-2 border-indigo-500 rounded-full py-4 bg-transparent w-100 px-4 outline-none"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <div className="flex justify-between">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="">Forgot password?</a>
          </div>

          <button
            className="text-2xl bg-indigo-600 hover:bg-indigo-700 rounded-full py-2 px-20 font-medium cursor-pointer"
          >
            Login
          </button>

          <div className="flex justify-center mb-10">
            <h2>Don't have an account?</h2>
            <a className="font-semibold" href="">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;