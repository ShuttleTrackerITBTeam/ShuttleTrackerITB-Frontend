import React, { useState } from 'react';
import Image from 'next/image';

interface LoginWarningProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginWarning: React.FC<LoginWarningProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // If isOpen is false, don't render anything
  }

  return (
    <div className='w-screen h-[100%] flex justify-center'>
      <div className='w-screen h-[100%] rounded-[20px] bg-transparent absolute top-[0px] z-[500] flex justify-center md:w-[468px]'>
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='top-[50%] translate-y-[-50%] absolute w-[85%] h-[200px] px-[20px] py-[20px] rounded-[20px] bg-white md:w-[309px]'>
          <div className='w-[100%] flex justify-end'>
            <Image
              src="/images/close.svg"
              alt='close-button'
              width={18}
              height={18}
              onClick={onClose}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className='flex justify-center'>
            <p className='font-medium text-[16px]'>Perhatian!</p>
          </div>
          <div className='flex justify-center text-[14px] w-[40%] mx-auto my-2 text-center md:w-[70%]'>
            <p className='font-normal'>Kamu perlu log in untuk menggunakan fitur ini 👉👈</p>
          </div>
          <button className='flex justify-center w-[128px] h-[39px] px-[20px] py-[10px] mx-auto bg-[#0078C9] rounded-[20px] text-white mt-[21px] font-bold text-[14px]'>
            <div className='flex justify-center gap-[9px]'>
              <Image alt="iconLogin" src="images/iconLogin.svg" width={20} height={20}  />
              Log In
            </div>
        </button>
        </div>
      </div>
    </div>
  );
};

export default LoginWarning;
