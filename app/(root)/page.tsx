import Dashboard from "@/components/Dashboard";
import LoginForm from "@/components/Login";

export default function Home() {

  const status= true

  if(status){
    return <Dashboard/>
  }
  return (
    <LoginForm/>
  );
}

