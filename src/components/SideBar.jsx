import React from 'react';
import { useSelector } from 'react-redux';
import { mainLinks, exploreLinks } from '@/utils/contants';

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  if (!isMenuOpen) return;

  return (
    <div className="p-5 shadow-lg w-60">
      <ul className="space-y-2">
        {mainLinks.map((link) => (
          <li
            key={link.name}
            className="flex item-center gap-3 p-2 rounded-md
          hover:bg-gray-100 cursor-pointer"
          >
            <link.icon />
            <span>{link.name}</span>
          </li>
        ))}
      </ul>
      <h1 className="font-bold pt-5">Explore</h1>
      <ul className="space-y-2">
        {exploreLinks.map((link) => (
          <li
            key={link.name}
            className="flex item-center gap-3 p-2 rounded-lg
          hover:bg-gray-100 cursor-pointer"
          >
            <span>{link.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
