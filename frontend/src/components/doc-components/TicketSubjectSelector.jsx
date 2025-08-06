import React from 'react';
import { Form } from 'react-bootstrap';

// Safe compare helper
const getChildren = (subjects, parentId) => {
  if (!parentId) {
    return subjects.filter(s => !s.parentId);
  }
  return subjects.filter(s => s.parentId === parentId);
};

const TicketSubjectSelector = ({ subjects, levels, setLevels }) => {
  const handleSelectChange = (levelIndex, selectedId) => {
    const updatedLevels = levels.slice(0, levelIndex + 1);
    updatedLevels[levelIndex].selectedId = selectedId;

    const children = getChildren(subjects, selectedId);

    // Debug log
    console.log(`Selected ID: ${selectedId}`);
    console.log('Children:', children);

    if (children.length > 0) {
      updatedLevels.push({ parentId: selectedId, selectedId: '' });
    }

    setLevels(updatedLevels);
  };

  return (
    <>
      {levels.map((level, idx) => {
        const options = getChildren(subjects, level.parentId);
        if (options.length === 0) return null;

        return (
          <Form.Group className="mb-3" key={idx}>
            <Form.Label>Select Subject Level {idx + 1}</Form.Label>
            <Form.Select
              value={level.selectedId}
              onChange={(e) => handleSelectChange(idx, e.target.value)}
            >
              <option value="">-- Select --</option>
              {options.map(opt => (
                <option key={opt._id} value={opt._id}>
                  {opt.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        );
      })}
    </>
  );
};

export default TicketSubjectSelector;


