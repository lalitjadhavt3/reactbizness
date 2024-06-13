import React, { useState } from 'react';
import '../styles/Tabs.css';
import HomeTab from '../components/HomeTab';
// Import more tab components as needed

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: 'Overview', component: <HomeTab /> },
    { title: 'Education', component:  null},
    { title: 'Experience', component:  null},
    // Add more tabs with their components here
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-sidebar">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${index === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default Tabs;
