import Dashboard from "@/components/Dashboard";
import LoginForm from "@/components/Login";

export default function HomeLayout({children}: {children?: React.ReactNode}) {

  const status= true

  if(status){
    return (
      <Dashboard>
        {children}
      </Dashboard>
    )
  }
  return (
    <LoginForm/>
  );
}

