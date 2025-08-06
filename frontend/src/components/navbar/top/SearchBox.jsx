import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const removeHighlights = () => {
  const marks = document.querySelectorAll('mark');
  marks.forEach(mark => {
    const textNode = document.createTextNode(mark.textContent);
    mark.replaceWith(textNode);
  });
};

const highlightText = (node, query) => {
  if (!query) return;

  if (node.nodeType === 3) {
    const text = node.textContent;
    const regex = new RegExp(`(${query})`, 'gi');
    if (regex.test(text)) {
      const span = document.createElement('span');
      span.innerHTML = text.replace(regex, '<mark>$1</mark>');
      node.replaceWith(span);
    }
  } else if (
    node.nodeType === 1 &&
    node.nodeName !== 'SCRIPT' &&
    node.nodeName !== 'STYLE' &&
    node.nodeName !== 'MARK'
  ) {
    Array.from(node.childNodes).forEach(child => highlightText(child, query));
  }
};

const SearchBox = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    removeHighlights();
    const trimmedInput = searchTerm.trim();
    if (trimmedInput.length > 0) {
      highlightText(document.body, trimmedInput);
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchTerm(searchInputValue);
    }
  };

  return (
    <Form className="position-relative" style={{ width: 320 }}>
      <Form.Control
        type="search"
        placeholder="Search..."
        aria-label="Search"
        className="rounded-pill search-input ps-5 p-2"
        value={searchInputValue}
        onChange={({ target }) => setSearchInputValue(target.value)}
        onKeyDown={handleKeyDown}
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="position-absolute text-400"
        style={{ left: '15px', top: '50%', transform: 'translateY(-50%)' }}
      />
      {(dropdownOpen || searchInputValue) && (
        <div
          className="search-box-close-btn-container"
          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
        >
        </div>
      )}
    </Form>
  );
};

export default SearchBox;
