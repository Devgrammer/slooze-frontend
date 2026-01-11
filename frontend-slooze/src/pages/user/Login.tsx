import React, { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "../../components/ui/label";
import axios from "axios";
import { API_URLS } from "../../constant/api";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";
const Login = () => {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser, setIsLoading, setError } = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(API_URLS.LOGIN, formData);
      if (response.status === 201) {
        const { token, user } = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-form w-screen min-h-screen flex">
      <div className="login-pane w-1/2 place-content-center place-items-center">
        <Card className="w-full max-w-md space-y-6 ">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Login for free</CardDescription>
          </CardHeader>
          <CardContent className="flex-col w-full ">
            <form action="" onSubmit={handleSubmit}>
              <div className="form-container  space-y-6">
                <div className="form-field grid gap-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field grid gap-y-2">
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder="************"
                  />
                </div>
                <div className="submit-button mt-12">
                  <Button type="submit" className="w-full ">
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-y-2">
            <p className="text-sm">
              Don't have an account?{" "}
              <a className="tetx-sm" href="/sign-up">
                Signup Here.
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
      <div className="display-pane bg-cover bg-center w-1/2 bg-no-repeat bg-[url(https://images.unsplash.com/photo-1677297680558-df5641e505ee?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]"></div>
    </div>
  );
};

export default Login;
