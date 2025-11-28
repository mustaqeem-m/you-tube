import React from 'react';
import SideBarButtonList from './SideBarButtonList';
import VideoContainer from '@/components/VideoContainer';
import Buttons from '@/components/Buttons';
import ButtonList from '@/components/ButtonList';

const MainContainer = () => {
  return (
    <div className="col-span-10">
      <ButtonList />
      {/* <SideBarButtonList /> */}
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
