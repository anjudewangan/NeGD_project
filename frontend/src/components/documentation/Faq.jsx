import React, { useState } from 'react';
import PageHeader from 'components/common/PageHeader';
import { Accordion, Card, Button, Modal, Form } from 'react-bootstrap';
import { faqDoc } from 'data/faqs';
import FaqAccordionItem from 'components/pages/faq/faq-accordion/FaqAccordionItem';

const Faq = () => {
  const [faqs] = useState(faqDoc);

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showITModal, setShowITModal] = useState(false);

  const handleAdminOpen = () => setShowAdminModal(true);
  const handleAdminClose = () => setShowAdminModal(false);

  const handleITOpen = () => setShowITModal(true);
  const handleITClose = () => setShowITModal(false);

  return (
    <>
      <PageHeader
        title="Support/Help/Training"
        description="This section equips call center staff with the knowledge, tools, and guidelines to deliver consistent, high-quality citizen support for Digital India services."
        className="mb-3"
      >
        <div className="d-flex align-items-center justify-content-start gap-2 mt-2">
          <Button variant="primary" onClick={handleAdminOpen}>
            Admin Support
          </Button>
          <Button variant="outline-primary" onClick={handleITOpen}>
            IT Support
          </Button>
        </div>
      </PageHeader>

      {faqs.map((category, catIndex) => (
        <Card className="mb-4" key={catIndex}>
          <Card.Header as="h5">{category.category}</Card.Header>
          <Card.Body>
            <Accordion id={`accordionFaq-${catIndex}`} className="border rounded overflow-hidden">
              {category.items.map((faq, index) => (
                <FaqAccordionItem
                  key={faq.id}
                  faq={faq}
                  isFirst={index === 0}
                  isLast={index === category.items.length - 1}
                />
              ))}
            </Accordion>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showAdminModal} onHide={handleAdminClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Admin Support Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter your phone number" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Issue</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Describe the issue..." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAdminClose}>
            Cancel
          </Button>
          <Button variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showITModal} onHide={handleITClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>IT Support Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter your phone number" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>System ID</Form.Label>
              <Form.Control type="text" placeholder="Enter system or device ID" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Issue</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Describe the issue..." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleITClose}>
            Cancel
          </Button>
          <Button variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Faq;
