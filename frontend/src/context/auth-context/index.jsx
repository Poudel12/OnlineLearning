import { createContext } from "react";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { useState } from "react";

export const AuthContext = createContext(null);
    

export default function AuthProvider({ children }) {

const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  

    return(
     <AuthContext.Provider value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
    }}
    >
     {children}
    
    </AuthContext.Provider>
);
}
