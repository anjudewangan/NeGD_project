import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import digilockerLogo from 'assets/img/logos/digilocker-round.png';
import umangLogo from 'assets/img/logos/umang-round.png';
import aikoshLogo from 'assets/img/logos/ai-kosh.png';

const NineDotMenuDropdown = ({ dropdownClassName }) => {
  const links = [
    {
      title: 'DigiLocker',
      link: '/support/digilocker/login',
      img: digilockerLogo
    },
    {
      title: 'UMANG',
      link: '/support-desk',
      img: umangLogo
    },
    {
      title: 'Aikosh',
      link: '#!',
      img: aikoshLogo
    }
  ];

  const getInitialSelectedItem = () => {
    const savedTitle = localStorage.getItem('selectedMenuTitle');
    return links.find((item) => item.title === savedTitle) || links[1];
  };

  const [selectedItem, setSelectedItem] = useState(getInitialSelectedItem);

  const handleSelect = (item) => {
    setSelectedItem(item);
    localStorage.setItem('selectedMenuTitle', item.title);
    window.location.href = item.link;
  };

  return (
    <Dropdown
      navbar
      as="div"
      className={`nine-dot-menu-dropdown ${dropdownClassName ?? ''}`}
    >
      <Dropdown.Toggle
        bsPrefix="toggle"
        variant="link"
        className="nav-link dropdown-toggle d-flex align-items-center px-2 gap-2"
      >
        {selectedItem?.img && (
          <img
            src={selectedItem.img}
            alt={selectedItem.title}
            width={30}
            height={30}
            style={{ objectFit: 'contain' }}
          />
        )}
        <span className="fs-10 fw-medium">{selectedItem.title}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card dropdown-menu-end mt-2">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          {links.map((item) => (
            <Dropdown.Item
              key={item.title}
              as="button"
              onClick={() => handleSelect(item)}
              className="d-flex align-items-center gap-2 fs-10 px-3 py-2 link-600"
            >
              <img
                src={item.img}
                alt={item.title}
                width={40}
                height={40}
                style={{ objectFit: 'contain' }}
              />
              {item.title}
              {selectedItem.title === item.title && (
                <FontAwesomeIcon icon="check" className="ms-auto text-success" />
              )}
            </Dropdown.Item>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

NineDotMenuDropdown.propTypes = {
  dropdownClassName: PropTypes.string
};

export default NineDotMenuDropdown;
