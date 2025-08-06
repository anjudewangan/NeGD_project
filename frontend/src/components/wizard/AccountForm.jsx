import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { FaMobileAlt, FaUser, FaIdCard, FaGlobeAsia, FaEnvelope, FaLanguage, FaList, FaThList, FaExclamationCircle, FaTabletAlt, FaAndroid, FaClipboard, FaShareAlt, FaFileAlt, FaPhone, FaCogs, FaSitemap, FaDesktop, FaPlus } from 'react-icons/fa';

const WizardInput = ({ label, name, type = 'text', icon, errors, formControlProps, formGroupProps }) => {
  const isSelect = type === 'select';
  return (
    <Form.Group {...formGroupProps}>
      <Form.Label className="d-flex align-items-center">
        {icon && <span className="me-2">{icon}</span>}
        {label}
      </Form.Label>
      {isSelect ? (
        <Form.Select {...formControlProps} />
      ) : type === 'textarea' ? (
        <Form.Control as="textarea" rows={4} {...formControlProps} />
      ) : type === 'file' ? (
        <Form.Control type="file" {...formControlProps} />
      ) : (
        <Form.Control type={type} {...formControlProps} />
      )}
      {errors?.[name] && (
        <Form.Text className="text-danger">
          {errors[name]?.message}
        </Form.Text>
      )}
    </Form.Group>
  );
};

const AccountForm = ({ register, errors, watch }) => {
  return (
    <>

      <Row className="mb-3 align-items-center d-flex justify-content-between">
        <Col md={4}>
          <Form.Label>User Registration Status: </Form.Label>
        </Col>

        <Col md={2}>
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-warning d-flex align-items-center"
            >
              User Profile
            </button>
          </div>
        </Col>
      </Row>

      <FalconCardHeader
        title="UMANG Profile"
        titleTag="h5"
        className="mb-4"
        light
      />
      <Row className="mb-3">
        <Col md={4}>
          <WizardInput label="Mobile Number" name="mobileNumber" icon={<FaMobileAlt />} formControlProps={{ ...register('mobileNumber'), placeholder: 'Enter your mobile number' }} errors={errors} />
        </Col>
        <Col md={4}>
          <WizardInput label="Aadhaar Status" name="aadhaarStatus" icon={<FaIdCard />} formControlProps={{ ...register('aadhaarStatus'), placeholder: 'Enter Aadhaar status' }} errors={errors} />
        </Col>
        <Col md={4}>
          <WizardInput label="Email ID *" name="email" type="email" icon={<FaEnvelope />} formControlProps={{ ...register('email'), placeholder: 'Enter your email' }} errors={errors} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <WizardInput label="User Name" name="userName" icon={<FaUser />} formControlProps={{ ...register('userName'), placeholder: 'Enter user name' }} errors={errors} />
        </Col>
        <Col md={4}>
          <WizardInput label="State" name="state" icon={<FaGlobeAsia />} formControlProps={{ ...register('state'), placeholder: 'Enter state' }} errors={errors} />
        </Col>
        <Col md={4}>
          <WizardInput label="Language" name="language" icon={<FaLanguage />} formControlProps={{ ...register('language'), placeholder: 'Enter platform language' }} errors={errors} />
        </Col>
      </Row>
      <FalconCardHeader
        title="Wrap-up Details"
        titleTag="h5"
        className="my-4"
        light
      />
      <Row className="mb-3">
        <Col md={4}>
          <WizardInput label="Category *" name="category" type="select" icon={<FaList />} formControlProps={{ ...register('category'), children: (<><option value="">Select</option><option value="1">Option 1</option></>) }} errors={errors} />
        </Col>
        <Col md={4}>
          <WizardInput label="Sub Category" name="subCategory" type="select" icon={<FaThList />} formControlProps={{ ...register('subCategory'), children: (<><option value="">Select</option><option value="1">Option 1</option></>) }} errors={errors} />
        </Col>
        <Col md={4}>
          <WizardInput label="Issue Type *" name="issueType" type="select" icon={<FaExclamationCircle />} formControlProps={{ ...register('issueType'), children: (<><option value="">Select</option><option value="1">Option 1</option></>) }} errors={errors} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <WizardInput label="Type" name="type" icon={<FaClipboard />} formControlProps={{ ...register('type') }} errors={errors} />
        </Col>
        <Col md={4}>
          <WizardInput label="State" name="state" icon={<FaGlobeAsia />} type="select" formControlProps={{ ...register('state'), children: (<><option value="">Select State</option><option value="KA">Karnataka</option><option value="MH">Maharashtra</option></>) }} errors={errors} />
        </Col>
        <Col md={4}>
          <WizardInput label="Application" name="application" type="select" icon={<FaShareAlt />} formControlProps={{ ...register('application'), children: (<><option value="">Select Application</option><option value="1">Application 1</option></>) }} errors={errors} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <WizardInput label="Service" name="service" type="select" icon={<FaCogs />} formControlProps={{ ...register('service'), children: (<><option value="">Select Service</option><option value="1">Service 1</option></>) }} errors={errors} />
        </Col>
        <Col md={4}>
          <WizardInput label="Sub Service" name="subService" type="select" icon={<FaSitemap />} formControlProps={{ ...register('subService'), children: (<><option value="">Select Sub Service</option><option value="1">Sub Service 1</option></>) }} errors={errors} />
        </Col>
        <Col md={4}>
          <WizardInput label="Platform" name="platform" type="select" icon={<FaTabletAlt />} formControlProps={{ ...register('platform'), children: (<><option value="">Select Platform</option><option value="1">Web</option></>) }} errors={errors} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <WizardInput label="OS" name="os" icon={<FaAndroid />} formControlProps={{ ...register('os') }} errors={errors} />
        </Col>
        <Col md={4}>
          <WizardInput label="Mobile Handset" name="handset" icon={<FaTabletAlt />} formControlProps={{ ...register('handset') }} errors={errors} />
        </Col>
        <Col md={4}>
          <WizardInput label="UMANG App Version" name="appVersion" icon={<FaFileAlt />} formControlProps={{ ...register('appVersion') }} errors={errors} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <WizardInput label="Criticality of Issue *" name="criticality" type="select" icon={<FaExclamationCircle />} formControlProps={{ ...register('criticality'), children: (<><option value="">Select</option><option value="low">Low</option><option value="high">High</option></>) }} errors={errors} />
        </Col>
        <Col md={4}></Col>
        <Col md={4}>
          <WizardInput label="Alternate Mobile Number" name="alternateMobile" icon={<FaPhone />} formControlProps={{ ...register('alternateMobile') }} errors={errors} />
        </Col>
      </Row>

      <WizardInput label="Query Descriptions *" name="query" type="textarea" icon={<FaClipboard />} formControlProps={{ ...register('query') }} errors={errors} formGroupProps={{ className: 'mb-3' }} />

      <WizardInput label="Add Attachment" name="attachment" type="file" icon={<FaFileAlt />} formControlProps={{ ...register('attachment') }} errors={errors} formGroupProps={{ className: 'mb-3' }} />

      <Row className="mb-3 align-items-center d-flex justify-content-between">
        <Col md={4}>
          <WizardInput
            label="Assign To *"
            name="assignTo"
            type="select"
            icon={<FaUser />}
            formControlProps={{
              ...register('assignTo'),
              children: (
                <>
                  <option value="">Select</option>
                  <option value="1">User 1</option>
                </>
              )
            }}
            errors={errors}
          />
        </Col>

        <Col md={2}>
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-outline-primary d-flex align-items-center"
              onClick={() => console.log('Add Ticket clicked')}
            >
              <FaPlus className="me-2" />
              Add Ticket
            </button>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="d-flex justify-content-center gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => console.log('Cancel clicked')}
          >
            Cancel
          </button>
          <button
            type="reset"
            className="btn btn-primary"
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-success"
          >
            Submit
          </button>
        </Col>
      </Row>
    </>
  );
};

AccountForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func
};

export default AccountForm;
