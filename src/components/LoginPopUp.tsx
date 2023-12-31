import Image from 'next/image';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '@src/services/AuthContext';
import { useState } from 'react';

declare const google: any;

const LoginPopUp = () => {
  const { setUser, showLoginPopUp, setShowLoginPopUp } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const closeLoginPopUp = () => {
    setEmail('');
    setPassword('');
    setShowLoginPopUp(false);
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('https://shuttle-tracker-itb-backend.vercel.app/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const email = data.email;
        const formattedEmail = email.split('@')[0].substring(0, 8);
        localStorage.setItem('session', JSON.stringify(data));
        setUser(formattedEmail);
        closeLoginPopUp();
      } else {
        console.error('Login failed');
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGoogleLogin = () => {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('g_state='))) {
      document.cookie = 'g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    
    google.accounts.id.initialize({
      client_id: "177385549640-03fkvdchmh83l0deo78gc6h82tv9u2pj.apps.googleusercontent.com",
      callback: async (response: any) => {
        const decodedJwt = jwtDecode(response.credential) as { email: string, name: string };

        const email = decodedJwt.email;
        const name = decodedJwt.name;

        await fetch('https://shuttle-tracker-itb-backend.vercel.app/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: name }),
        });

        const loginResponse = await fetch('https://shuttle-tracker-itb-backend.vercel.app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: name }),
        });

        if (loginResponse.ok) {
          const data = await loginResponse.json();
          const email = data.email;
          const formattedEmail = email.split('@')[0].substring(0, 8);
          localStorage.setItem('session', JSON.stringify(data));
          setUser(formattedEmail);
          closeLoginPopUp();
        }
      },
    });

    google.accounts.id.prompt();
  };

  return (
    <>
      { showLoginPopUp && (
        <div className='fixed w-screen h-[100%] flex justify-center z-[500]'>
          <div className='w-screen h-[100vh] rounded-[20px] bg-transparent absolute top-[0px] z-[500] flex justify-center md:w-[100%]'>
            <div className='absolute inset-0 bg-black opacity-50' onClick={closeLoginPopUp}></div>
            <div className='top-[50%] translate-y-[-50%] absolute w-[309px] px-[20px] py-[20px] rounded-[20px] bg-white md:w-[309px]'>
              <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-row mb-[25px]'>
                  <button className="absolute left-0 ml-[17px]" onClick={closeLoginPopUp}>
                    <img className=" rounded-full hover:brightness-110 hover:shadow-lg" src="images/back.svg" alt="back" width={39} height={39}/>
                  </button>
                  <h1 className='text-[24px] mt-[3px] font-bold font-montserrat'>Login</h1>
                </div>
                <div className="flex flex-col space-y-3 w-[100%] items-center justify-center">
                  <input type="email" className='w-[90%] h-[39px] px-[20px] py-[10px] bg-[#D9D9D9] rounded-[20px] text-black text-[14px]' placeholder='Email' value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                  <input type="password" className='w-[90%] h-[39px] px-[20px] py-[10px] bg-[#D9D9D9] rounded-[20px] text-black text-[14px]' placeholder='Password' value={password}
                        onChange={(e) => setPassword(e.target.value)}  />
                  <button className='w-[90%] h-[39px] px-[20px] py-[10px] bg-[#0078C9] rounded-[20px] text-white font-bold text-[14px]' onClick={handleLogin}>
                    <div className='flex justify-center gap-[9px]'>
                      {/* <Image alt="iconLogin" src="images/iconITB.svg" width={20} height={20}  /> */}
                      {/* ITB Account/SSO Login */}
                      Login
                    </div>
                  </button>
                  <button className='w-[90%] h-[39px] px-[10px] py-[10px] bg-[#00AFF7] rounded-[20px] text-white font-bold text-[14px]' onClick={handleGoogleLogin} >
                    <div className='flex justify-center items-center gap-[10px]'>
                      <div style={{ 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '50%', 
                        backgroundColor: '#FFFFFF', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        <Image alt="iconLogin" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" width={15} height={15} />
                      </div>
                      Lanjutkan Dengan Google
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
  
export default LoginPopUp;
  