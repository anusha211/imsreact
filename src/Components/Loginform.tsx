
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Forms.css';

interface LoginFormErrors {
  username?: string;
  password?: string;
}

const validateUsername = (username: string): string | undefined => {
    if (!username.trim()) {
      console.log('username is empty');
      return 'username is required';
   
    }
  };
  
  const validatePassword = (password: string): string | undefined => {
    if (!password.trim()) {
      console.log('password is required');
      return 'Password is required';
    }
  };

const Login: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<LoginFormErrors>({});
 // const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (validateForm()) {
          // Your login logic here
          if(username=='user'&&password=='password'){
            alert('login success!!')
          console.log('Logging successful:', username);
         // navigate('/home'); // Navigate to home page
          }
          else{
            alert('incorrect password!!')
            console.log('password incorrect!');
          }
      } else {
          console.log('Form has errors. Cannot submit.');
      }
  };

  const validateForm = (): boolean => {
      const newErrors: LoginFormErrors = {
        
        username: validateUsername(username),
        password: validatePassword(password)
      };

    
      const valid = !newErrors.username && !newErrors.password;

      setErrors(newErrors);
      return valid;
  };
 
  return (
   
<div>
   <h3 style={{color : "darkolivegreen", marginBottom: "40px",marginTop: "0px"}}>Login</h3>
<form onSubmit={handleSubmit} >
   <div className="input-group">
       <div className="input-field">
           <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required></input>
       </div>
       <div className="input-field">
           <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required></input>
       </div>
       {errors.password && <span className="error">{errors.password}</span>}
         <button type="submit" style={{marginTop:"10px"}}>Login</button>   
   </div>      
</form>
 </div>
  );
};
export default Login;
export {validatePassword, validateUsername};





