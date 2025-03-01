/* eslint-disable */
import './App.css';
import { useEffect, useState } from 'react';

const App = () => {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[emailDirty, setEmailDirty] = useState(false)
  const[passwordDirty, setPasswordDirty] = useState(false)
  const[emailError, setEmailError] = useState('Емейл не может быть пустым')
  const[passwordError, setPasswordError] = useState('Пароль не может быть пустым')
  const[formValid, setFormValid] = useState(false)
  
 

  useEffect(() => {
    if(emailError || passwordError){
      setFormValid(false)
    } else{
      setFormValid(true)
    }
  
  }, [emailError, passwordError])

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный емейл')
    } else {
      setEmailError("")
    }
  }
  
  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if(e.target.value.length < 3){
      setPasswordError('Пароль должен быть длиннее 3 символов')
      if(!e.target.value){
        setPasswordError('Пароль не может быть пустым')
      }
    }
    if(e.target.value.length > 11){
      setPasswordError('Пароль должен быть короче 11 символов')
      if(!e.target.value){
        setPasswordError('Пароль не может быть пустым')
      }
    } else {
      setPasswordError('')}
  } 


  const blurHandler = (e) => {
    switch(e.target.name){ 
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true) 
        break
      default:
        break
    }
  }

  return (
    <div className='app'>
      <form>
        <h1>Регистрация</h1> 
        {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
        <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type="text" placeholder='Enter your email....'/>
        {(passwordError && passwordDirty) && <div style={{color:'red'}}>{passwordError}</div>} 
        <input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type="password" placeholder='Enter your password....'/> 
        <button disabled={!formValid} type="submit">Регистрация</button>
        
      </form>
      
    </div>
  );
}


export default App;
