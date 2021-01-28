import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div>
      <Link to='/'>Home</Link>{' '}
      <Link to='/create'>Create</Link>
    </div>
  )
}

export default Header;