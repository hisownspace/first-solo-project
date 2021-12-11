import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

import splash from  '../../background-image.webp';
import logo from '../../roomshare_plus_logo.png'
import LoginFormModal from '../LoginFormModal';

function Splash() {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  if (sessionUser) return <Redirect to="/rooms" />;

  return (
    <div className='splash-back'>
      {/* <NavLink to='/rooms'> */}<img onClick={() => setShowModal(true)} className='splash-image' alt='Splash' src={splash}></img>
      <h2 onClick={() => setShowModal(true)} className='splash-tagline'>EXPERIENCE SOMETHING DIFFERENT</h2>
      <img onClick={() => setShowModal(true)} alt='roomshare logo' className='splash-logo' src={logo}></img>{/* </NavLink> */}
      <div>
        <LoginFormModal showModal={showModal} setShowModal={setShowModal}/>
      </div>
    </div>
  )
}

export default Splash;