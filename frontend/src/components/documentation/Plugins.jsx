import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Button, Col, Collapse, Form, Row, Card } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';

library.add(faPlus, faTrash, faEdit, faSave, faTimes);

const Flex = ({ children, className = '', alignItems = '', ...props }) => (
  <div className={`d-flex ${alignItems} ${className}`} {...props}>
    {children}
  </div>
);

const InputField = ({ label, name, value, handleChange, as = 'input', rows = 1 }) => (
  <Form.Group as={Row} className="mb-3">
    <Form.Label column sm={3}>{label}</Form.Label>
    <Col sm={9}>
      <Form.Control
        as={as}
        rows={rows}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </Col>
  </Form.Group>
);

const ExperienceForm = ({ collapsed, setCollapsed, onSave }) => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState({ title: '', content: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate() && onSave) {
      onSave({
        title: formData.title.trim(),
        content: formData.content.trim()
      });
      setFormData({ title: '', content: '' });
      setCollapsed(true);
    }
  };

  return (
    <div>
      <Flex
        alignItems="center"
        className="mb-3 text-primary cursor-pointer fs-9 align-items-center"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="circle-dashed">
          <FontAwesomeIcon icon="plus" />
        </span>
        <span className="ms-3">Add new note</span>
      </Flex>
      <Collapse in={!collapsed} className="px-5">
        <div>
          <Form onSubmit={handleSubmit} noValidate>
            <InputField
              value={formData.title}
              label="Title"
              name="title"
              handleChange={handleChange}
            />
            {errors.title && (
              <div className="text-danger ms-auto mb-2" style={{ maxWidth: '70%' }}>
                {errors.title}
              </div>
            )}

            <InputField
              value={formData.content}
              label="Content"
              name="content"
              handleChange={handleChange}
              as="textarea"
              rows={3}
            />
            {errors.content && (
              <div className="text-danger ms-auto mb-2" style={{ maxWidth: '70%' }}>
                {errors.content}
              </div>
            )}

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ offset: 3 }}>
                <Button type="submit" disabled={!!errors.title || !!errors.content}>
                  Save
                </Button>
              </Col>
            </Form.Group>
          </Form>
          <div className="border-dashed border-bottom my-3" />
        </div>
      </Collapse>
    </div>
  );
};

ExperienceForm.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
  onSave: PropTypes.func
};

const Plugins = () => {
  const [notes, setNotes] = useState([]);
  const [collapsed, setCollapsed] = useState(true);

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ title: '', content: '' });
  const [editErrors, setEditErrors] = useState({ title: '', content: '' });

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString(undefined, options);
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString();
  };

  const handleSaveNote = newNote => {
    const currentDate = getCurrentDate();
    const newNoteWithDate = { ...newNote, date: currentDate };
    setNotes([newNoteWithDate, ...notes]);
  };

  const handleDeleteNote = indexToDelete => {
    const updatedNotes = notes.filter((_, i) => i !== indexToDelete);
    setNotes(updatedNotes);
    if (editIndex === indexToDelete) {
      setEditIndex(null);
      setEditData({ title: '', content: '' });
      setEditErrors({ title: '', content: '' });
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData({
      title: notes[index].title,
      content: notes[index].content
    });
    setEditErrors({ title: '', content: '' });
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
    setEditErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateEdit = () => {
    const newErrors = {};
    if (!editData.title.trim()) newErrors.title = 'Title is required';
    if (!editData.content.trim()) newErrors.content = 'Content is required';
    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveEdit = () => {
    if (!validateEdit()) return;
    const updatedNotes = [...notes];
    updatedNotes[editIndex] = {
      ...updatedNotes[editIndex],
      title: editData.title.trim(),
      content: editData.content.trim()
    };
    setNotes(updatedNotes);
    setEditIndex(null);
    setEditData({ title: '', content: '' });
    setEditErrors({ title: '', content: '' });
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditData({ title: '', content: '' });
    setEditErrors({ title: '', content: '' });
  };

  const colors = ['primary', 'success', 'danger', 'info', 'secondary'];

  return (
    <Row>
      <Col md={6}>
        <Card className="mt-3">
          <FalconCardHeader title="Notes" />
          <Card.Body style={{ backgroundColor: '#F9FAFD' }}>
            <ExperienceForm
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              onSave={handleSaveNote}
            />
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="mt-3">
          <FalconCardHeader title="All Notes" />
          <Card.Body style={{ backgroundColor: '#F9FAFD' }}>
            {notes.length === 0 ? (
              <p>No notes yet.</p>
            ) : (
              notes.map((note, i) => {
                const color = colors[i % colors.length];
                return (
                  <div
                    key={i}
                    className={`mb-3 border-bottom border-${color} pb-2 d-flex justify-content-between align-items-start`}
                  >
                    <div style={{ flex: 1, paddingRight: '1rem' }}>
                      {editIndex === i ? (
                        <>
                          <Form.Control
                            type="text"
                            name="title"
                            value={editData.title}
                            onChange={handleEditChange}
                            className={`mb-1 border border-${color}`}
                            isInvalid={!!editErrors.title}
                          />
                          <Form.Control.Feedback type="invalid">
                            {editErrors.title}
                          </Form.Control.Feedback>

                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="content"
                            value={editData.content}
                            onChange={handleEditChange}
                            className={`border border-${color}`}
                            isInvalid={!!editErrors.content}
                          />
                          <Form.Control.Feedback type="invalid">
                            {editErrors.content}
                          </Form.Control.Feedback>
                        </>
                      ) : (
                        <>
                          <h5>{note.title}</h5>
                          <p className="mb-1">{note.content}</p>
                        </>
                      )}
                    </div>
                    <div
                      className="text-end d-flex flex-column align-items-center"
                      style={{ minWidth: '110px' }}
                    >
                      <small className={`text-${color}`}>{formatDate(note.date)}</small>

                      {editIndex === i ? (
                        <div className="mt-2 d-flex gap-2">
                          <FontAwesomeIcon
                            icon="save"
                            className="text-success"
                            style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                            title="Save changes"
                            onClick={handleSaveEdit}
                          />
                          <FontAwesomeIcon
                            icon="times"
                            className="text-secondary"
                            style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                            title="Cancel editing"
                            onClick={handleCancelEdit}
                          />
                        </div>
                      ) : (
                        <div
                          className="mt-2 d-flex gap-3 justify-content-center"
                          style={{ width: '100%' }}
                        >
                          <FontAwesomeIcon
                            icon="edit"
                            className="text-success"
                            style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                            title="Edit note"
                            onClick={() => handleEditClick(i)}
                          />
                          <FontAwesomeIcon
                            icon="trash"
                            className="text-danger"
                            style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                            title="Delete note"
                            onClick={() => handleDeleteNote(i)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Plugins;
