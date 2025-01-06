// Navbar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined , AppstoreOutlined, GithubFilled} from '@ant-design/icons';
// MailOutlined, SettingOutlined ,
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './Navbar.css'; 


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '首頁',
    key: '',
    icon: <HomeOutlined />,
  },
  {
    label: 'About',
    key: 'about',
    icon: <AppstoreOutlined />,
  },
  {
    label: '部落格',
    key: 'blog',
    icon: <AppstoreOutlined />,
  },
  {
    disabled:true,
    label: 'Blog',
    key: 'asd',
    icon: <GithubFilled />,
    children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            { label: 'Option 1', key: 'setting:1' },
            { label: 'Option 2', key: 'setting:2' },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            { label: 'Option 3', key: 'setting:3' },
            { label: 'Option 4', key: 'setting:4' },
          ],
        },
      ],
  },
  {
    key: 'external',
    icon: <GithubFilled/>,
    label: (
      <a href="https://github.com/JeffLin0225" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    ),
  },
];

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  return ( <div  className="navbar-container"> <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className="navbar" /> </div> );
};

export default Navbar;
