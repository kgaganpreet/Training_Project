import { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Newsletter = () => {
  const { backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${backendUrl}/api/newsletter/subscribe`, { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to subscribe right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className=' text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti veniam quisquam quasi eveniet pariatur nisi unde. Natus eum sint rerum, quas rem ipsa expedita consequuntur neque cum eveniet cupiditate vero?
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Enter your email' required/>
        <button type='submit' disabled={isSubmitting} className='bg-black text-white text-xs px-10 py-4 disabled:cursor-not-allowed disabled:opacity-60'>
          {isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
        </button>
      </form>
    </div>
  )
}

export default Newsletter
