export const signUpFormControls = [
    {
        name: 'userName',
        label : 'User Name',
        type: 'text',
        placeholder: 'Enter your user name',
        componentType: 'input',
        
    },

    {
        name: 'userEmail',
        label : 'User Email',
        type: 'email',
        placeholder: 'Enter your user email',
        componentType: 'input'
    },

    {
        name: 'password',
        label : 'User password',
        type: 'password',
        placeholder: 'Enter your user password',
        componentType: 'input'
    },
];

export const signInFormControls = [
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const initialSignInFormData = {
  userEmail: "",
  password: "",
};
export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
};