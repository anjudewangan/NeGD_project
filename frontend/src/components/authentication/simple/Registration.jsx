import React, { useRef, useState } from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { FaUser, FaPrint, FaEdit } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Registration = () => {
  const [reply, setReply] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleChooseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  return (
    <>
      <Row className="mb-3 align-items-center">
        <Col>
          <h6 className="mb-0 d-flex align-items-center gap-2">
            Ticket #357381
            <Button variant="outline-secondary" size="sm">
              <FaEdit className="me-1" />
              Edit
            </Button>
          </h6>
          <h5 className="text-dark fw-bold">
            Sign In / OTP related issues / Don't have old mobile number
          </h5>
        </Col>
        <Col xs="auto">
          <Button variant="light" size="sm">
            <FaPrint className="me-1" />
            Print
          </Button>
        </Col>
      </Row>

      <Card className="mb-3">
        <Card.Body className="py-2 bg-light">
          <h6 className="fw-bold">Basic Ticket Information</h6>
          <hr />
          <Row className="mb-2">
            <Col md={6}>
              <strong className="text-dark">Status:</strong> Open
            </Col>
            <Col md={6}>
              <strong className="text-dark">Create Date:</strong> 22/05/2025 3:16 PM
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <strong className="text-dark">Name:</strong> Abbas Vora
            </Col>
            <Col md={6}>
              <strong className="text-dark">Email:</strong> abbasvora23@gmail.com
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4 border shadow-sm">
        <Card.Header
          style={{ backgroundColor: '#C3D9FF', borderRadius: '0.3rem 0.3rem 0 0' }}
          className="text-dark d-flex align-items-center gap-2"
        >
          <FaUser />
          <strong>Abbas Vora</strong> posted 22/05/2025 3:16 PM
        </Card.Header>
        <Card.Body className="bg-white">
          Testing for OS Ticket
        </Card.Body>
      </Card>

      <h5>Post a Reply</h5>
      <p className="text-muted fst-italic">
        To best assist you, we request that you be specific and detailed *
      </p>

      <Form>
        <Form.Group className="mb-3">
          <ReactQuill
            theme="snow"
            value={reply}
            onChange={setReply}
            placeholder="Type your reply..."
            style={{ height: '200px', marginBottom: '50px' }}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <div
            className="border border-secondary-subtle rounded p-3 bg-light"
            style={{ borderStyle: 'dashed', textAlign: 'start', cursor: 'pointer' }}
            onClick={handleChooseClick}
          >
            Drop files here or <span className="text-primary text-decoration-underline">choose them</span>
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <ul className="mb-0">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>
                      {file.name} <span className="text-muted">({file.type || 'Unknown type'})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Form.Control
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="d-none"
          />
        </Form.Group>

        <div className="d-flex justify-content-center gap-2">
          <Button variant="success">Post Reply</Button>
          <Button variant="secondary">Reset</Button>
          <Button variant="danger">Cancel</Button>
        </div>
      </Form>
    </>
  );
};

export default Registration;
