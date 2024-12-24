import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Service from './Service';

const Services = () => {
  const service = useLoaderData();
  console.log(service)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4'>
      {service.map(items => (
        <Service key={items._id} service={items}></Service>
      ))}
    </div>
  );
};

export default Services;