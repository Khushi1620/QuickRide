import '../../ResponsiveCSS/responsive.css';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerUser } from '../../services/authServices';

// Schema validation using Zod
const registerSchema = z.object({
  firstName: z.string()
    .min(3, "First name should contain at least 3 characters.")
    .max(20, "First name should contain at most 20 characters."),
  lastName: z.string()
    .min(3, "Last name should contain at least 3 characters.")
    .max(20, "Last name should contain at most 20 characters."),
  emailId: z.string()
    .email("Please enter a valid email address."),
  age: z.coerce.number()
    .min(18, "You must be at least 18 years old.")
    .max(100, "Age must be less than 100."),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Please select a gender." })
  }),
  password: z.string()
    .min(8, "Password must contain at least 8 characters.")
});

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);
      console.log("Server responses: ", result.data);
      alert(result.data.message || "User registered successfully!");
    } catch(error) {
      console.log("Error in registration frontend: "+ error.message);
      alert('Registration failed...!!!');
    }
  };

  return (
    <div className="bg-slate-900 text-white h-screen w-screen flex justify-center items-center">
      <div className="login_container border-2 border-indigo-500 px-10 py-8">
        <h1 className="heading text-5xl font-bold text-center mb-10">
          Create an account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

          <input
            {...register("firstName")}
            className="input_field border-2 border-indigo-500 rounded-2xl py-3 bg-transparent w-full px-4 outline-none"
            type="text"
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

          <input
            {...register("lastName")}
            className="input_field border-2 border-indigo-500 rounded-2xl py-3 bg-transparent w-full px-4 outline-none"
            type="text"
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

          <input
            {...register("emailId")}
            className="input_field border-2 border-indigo-500 rounded-2xl py-3 bg-transparent w-full px-4 outline-none"
            type="email"
            placeholder="Enter your email"
          />
          {errors.emailId && <p className="text-red-500">{errors.emailId.message}</p>}

          <input
            {...register("age")}
            className="input_field border-2 border-indigo-500 rounded-2xl py-3 bg-transparent w-full px-4 outline-none"
            type="number"
            placeholder="Enter your age"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}

          <div>
            <h2 className="mb-2 text-lg font-semibold">Select Your Gender</h2>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  {...register("gender")}
                  type="radio"
                  value="male"
                  className="accent-indigo-600"
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  {...register("gender")}
                  type="radio"
                  value="female"
                  className="accent-indigo-600"
                />
                Female
              </label>
            </div>
            {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
          </div>
          <input
            {...register("password")}
            className="input_field border-2 border-indigo-500 rounded-2xl py-3 bg-transparent w-full px-4 outline-none"
            type="password"
            placeholder="Create a strong password"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button
            type="submit"
            className="button text-2xl mt-2 bg-indigo-600 hover:bg-indigo-700 rounded-2xl py-2 px-20 font-medium cursor-pointer"
          >
            Create account
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;
