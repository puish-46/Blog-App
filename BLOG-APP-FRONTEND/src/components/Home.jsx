import { useNavigate } from 'react-router'
import { 
  primaryBtn,
  ghostBtn,
  mutedText,
  pageTitleClass
 } from '../styles/common';

function Home() {

  const navigate=useNavigate();

  const onRegister=()=>{
    navigate("/register")
  }

  const OnLogin=()=>{
    navigate("/login")
  }

  return (
    <div className='text-center'>
      <h1 className={`${pageTitleClass} mt-50 mb-5`}>Ideas Worth Sharing</h1>
      <p className={`${mutedText} mb-5`}>Discover fresh ideas, insightful articles, and powerful voices from creators around the world.</p>
      <div className='flex justify-center gap-10'>
        <button onClick={onRegister} className={primaryBtn}>Register</button>
        <button onClick={OnLogin}  className={ghostBtn}>Login</button>
      </div>
    </div>
  )
}

export default Home