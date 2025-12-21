import React, { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "../../components/ui/label";
const Login = () => {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setFromData({ ...formData, email: e.target.value });
    } else {
      setFromData({ ...formData, password: e.target.value });
    }
  };
  console.log(formData);
  return (
    <div className="login-form w-screen min-h-screen flex">
      <div className="login-pane w-1/2 place-content-center place-items-center">
        <Card className="w-full max-w-md space-y-6 ">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Signup for free</CardDescription>
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
              Already have an account?{" "}
              <a className="tetx-sm" href="/">
                Login Here.
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
