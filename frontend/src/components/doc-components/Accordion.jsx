import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaClock, FaServicestack } from 'react-icons/fa';
import PageHeader from 'components/common/PageHeader';
import FalconComponentCard from 'components/common/FalconComponentCard';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} color="#f1c40f" />);
  if (halfStar) stars.push(<FaStarHalfAlt key="half" color="#f1c40f" />);
  for (let i = 0; i < emptyStars; i++) stars.push(<FaRegStar key={`empty-${i}`} color="#f1c40f" />);

  return stars;
};


const commonDetails = (logo) => (
  <>
    <hr />
    <div className="d-flex justify-content-between text-center my-3">
      <div className="flex-fill">
        <FaPhone size={36} color="#27ae60" className="mb-2" />
        <div><strong>Phone</strong></div>
        <div>+91-1234567890</div>
      </div>
      <div className="flex-fill">
        <FaEnvelope size={36} color="#e74c3c" className="mb-2" />
        <div><strong>Email</strong></div>
        <div>info@service.gov.in</div>
      </div>
      <div className="flex-fill">
        <FaGlobe size={36} color="#2980b9" className="mb-2" />
        <div><strong>Website</strong></div>
        <div>
          <a href="https://service.gov.in" target="_blank" rel="noreferrer">
            service.gov.in
          </a>
        </div>
      </div>
    </div>
    <hr />

    <div style={{ lineHeight: '1.8' }}>
      <div><FaClock style={{ marginRight: '8px' }} /> <strong>Working Hours:</strong> Monday to Friday (9:00 AM - 06:00 PM)</div>
      <div><FaMapMarkerAlt style={{ marginRight: '8px' }} /> <strong>Address:</strong> Ministry of Electronics & IT, Government of India, New Delhi</div>
    </div>
    <hr />
    <div style={{ lineHeight: '1.8' }}>
      <h5 style={{ marginBottom: '20px', backgroundColor: '#276DCB', color: '#fff', padding: '12px' }}>Services</h5>
      <ul className="mb-0 list-unstyled">
        {[
          { name: "Registration", rating: 4.1, desc: "Facilitates trainees to register for various workshops." },
          { name: "General Details", rating: 4.3, desc: "Update general details for workshop applications." },
          { name: "Profile", rating: 5.0, desc: "Update profile information." },
          { name: "Workshops", rating: 4.1, desc: "View and apply for available workshops." },
          { name: "Applied Workshops", rating: 4.1, desc: "Manage applied workshops." },
          { name: "Attendance", rating: 4.2, desc: "View workshop attendance." },
          { name: "Feedback", rating: 4.7, desc: "Provide feedback on attended workshops." },
          { name: "Test Marks", rating: 4.3, desc: "View test scores after workshops." },
          { name: "Download Certificates", rating: 4.2, desc: "Download certificates after completion." },
          { name: "Verify Your Certificate", rating: 3.9, desc: "Verify issued certificates." },
          { name: "FAQ", rating: null, desc: "Frequently Asked Questions." }
        ].map(({ name, rating, desc }) => (
          <li key={name} className="d-flex justify-content-between align-items-start py-3 border-bottom">
            <div className="d-flex">
              <img
                src={logo}
                alt={`${name} icon`}
                style={{ width: 50, height: 50, marginRight: 12 }}
              />
              <div>
                <strong>{name}</strong>
                <div className="text-muted">{desc}</div>
              </div>
            </div>
            {rating !== null && (
              <div className="text-end" style={{ minWidth: 100 }}>
                <div className="fw-bold" style={{ fontSize: '0.9rem' }}>{rating.toFixed(1)}</div>
                <div>{renderStars(rating)}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  </>
);

const accordionItems = [
  {
    key: "0",
    title: "Board of School Education Haryana",
    logo: "https://media.umangapp.in/app/ico/service/NationalEmblem23.png",
    description: "Photocopy of Answer Book"
  },
  {
    key: "1",
    title: "Aadhaar",
    logo: "https://media.umangapp.in/app/ico/service/aadhaar1.png",
    description: "To explore UIDAIs online services, click the Login button..."
  },
  {
    key: "2",
    title: "Aajeevika",
    logo: "https://media.umangapp.in/app/ico/service/aajeevika.png",
    description: "Aajeevika-National Rural Livelihoods Mission (NRLM) was launched..."
  },
  {
    key: "3",
    title: "Aaple Sarkar Maha DBT",
    logo: "https://media.umangapp.in/app/ico/service/mahadbt.png",
    description: "Aaple Sarkar Maha DBT (Direct Benefit Transfer) is a Maharashtra..."
  },
  {
    key: "4",
    title: "ABHA",
    logo: "https://media.umangapp.in/app/ico/service/abha.png",
    description: "Ayushman Bharat Health Account (ABHA) is a personal health viewer..."
  },
  {
    key: "5",
    title: "Aaple Sarkar",
    logo: "https://media.umangapp.in/app/ico/service/aaplesarkar.png",
    description: "The Maharashtra Right to Public Service Act, 2015 is a revolutionary Act..."
  },
  {
    key: "6",
    title: "ACADEMIC BANK OF CREDITS",
    logo: "https://media.umangapp.in/app/ico/service/NationalEmblem23.png",
    description: "The Academic Bank of Credits (ABC) is an educational digital platform..."
  },
  {
    key: "7",
    title: "AICTE",
    logo: "https://media.umangapp.in/app/ico/service/aicte.png",
    description: "The All India Council for Technical Education (AICTE) is the statutory body..."
  },
  {
    key: "8",
    title: "AICTE Training And Learning (ATAL) Academy",
    logo: "https://media.umangapp.in/app/ico/service/atalacademy.png",
    description: "AICTE Training & Learning Academy (ATAL Academy) facilitates through trainings..."
  }
];

const AccordionComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleStateChange = (e) => setSelectedState(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return (
    <>
      <PageHeader title="Fetch NeGD Service Details" className="mb-3" />
      <FalconComponentCard>
        <FalconComponentCard.Header title="Services">
          <p className="mb-0">
            The <code>National e-Governance Division</code> <code>(NeGD)</code> offers a wide range of services through its various specialized departments, each dedicated to enhancing digital governance across India.
          </p>
          <Row className="align-items-center g-2 mt-3">
            <Col md={6}>
              <input
                type="text"
                placeholder="Search service…"
                className="form-control"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Col>
            <Col md={6} className="text-md-end">
              <Button variant="primary" onClick={handleShowModal}>
                Select State
              </Button>
            </Col>
          </Row>
        </FalconComponentCard.Header>

        <FalconComponentCard.Body>
          <Accordion>
            {accordionItems.map(item => (
              <Accordion.Item eventKey={item.key} key={item.key}>
                <Accordion.Header>
                  <img src={item.logo} alt="Logo" style={{ marginRight: '8px', width: '50px' }} />
                  {item.title}
                </Accordion.Header>
                <Accordion.Body>
                  <p>{item.description}</p>
                  {commonDetails(item.logo)}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </FalconComponentCard.Body>

      </FalconComponentCard>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Your State</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="stateSelect">
            <Form.Label>Choose a state</Form.Label>
            <Form.Select value={selectedState} onChange={handleStateChange}>
              <option value="">-- Select State/UT --</option>
              <optgroup label="States">
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </optgroup>
              <optgroup label="Union Territories">
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
              </optgroup>
            </Form.Select>

          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary">
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccordionComponent;
