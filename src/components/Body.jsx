import MainContainer from '@/components/MainContainer';
import Sidebar from '@/components/SideBar';
import React from 'react';

const Body = () => {
  return (
    <div className="flex">
      <Sidebar />
      <MainContainer className="grow" />
    </div>
  );
};

export default Body;
