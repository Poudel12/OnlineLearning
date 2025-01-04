
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {Tabs} from "@/components/ui/Tabs";

function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');

    function handleTabChange(value){
        setActiveTab(value);
    }


    return  <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex item-center border-b">
            <Link to={'/'} className="flex item-center justify-center">
            <GraduationCap className="h-8 w-8 mr-4"/>
            <span className="font-extrabold text-xl">My Learning</span>
            </Link>
        </header>
        <div className="flex items-center justify-center min-h-screen bg-background">
          <Tabs
            value={activeTab}
            defaultValue="login"
            onValueChange={handleTabChange}
            className="w-full max-w-md"
           >
             {/* Tabs Header */}
            <TabsList className="grid w-full grid-cols-2 bg-gray-200 rounded-lg">
              <TabsTrigger
                value="login"
                className={`py-2 px-4 text-center font-medium rounded-lg ${
                  activeTab === "login"
                    ? "bg-gray-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className={`py-2 px-4 text-center font-medium rounded-lg ${
                  activeTab === "register"
                    ? "bg-gray-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value='login'> </TabsContent>
            <TabsContent value='register'> </TabsContent>
                    
             </Tabs> 
        </div>
    </div>
  
}
export default AuthPage ;