import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import thailand from '../../assets/icons/thailand.png';
import uk from '../../assets/icons/uk.png';
import './MenuLan.scss';

const MenuLan = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
  };

  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
    changeLanguage(language);
  };

  const getLanguageImage = (language: string) => {
    switch (language) {
      case 'th':
        return thailand;
      case 'en':
        return uk;
      default:
        return uk;
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      changeLanguage(savedLanguage);
    }
  }, []);

  const menu = (
    <Menu className="menu-dropdown">
      <Menu.Item key="en">
        <div
          onClick={() => handleLanguageSelection('en')}
          className={`menu-item ${selectedLanguage === 'en' ? 'active' : ''}`}
        >
          English
        </div>
      </Menu.Item>
      <Menu.Item key="th">
        <div
          onClick={() => handleLanguageSelection('th')}
          className={`menu-item ${selectedLanguage === 'th' ? 'active' : ''}`}
        >
          ไทย
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className="menu-trigger">
        <img src={getLanguageImage(selectedLanguage)} alt="Language" className="icon-large" />
        <DownOutlined />
      </div>
    </Dropdown>
  );
};

export default MenuLan;
