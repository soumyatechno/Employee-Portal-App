import React from 'react';
import {FaEnvelope,FaIdBadge,FaPhone,FaUserCircle} from 'react-icons/fa';

export default function ClientInfo({employee}) {
  return (
    <>
    <h5 className='mt-5'>Client Information</h5>
    <ul className='list-group'>
        <li className='list-group=item'>
            <FaIdBadge className='icon'/>{employee.name}
        </li>
        <li className='list-group=item'>
            <FaEnvelope className='icon'/>{employee.email}
        </li>
        <li className='list-group=item'>
            <FaPhone className='icon'/>{employee.phone}
        </li>
        <li className='list-group=item'>
            <FaUserCircle className='icon'/>{employee.designation}
        </li>
    </ul>
    </>
  )
};
