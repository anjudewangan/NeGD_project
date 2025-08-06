import React, { useState, useEffect } from "react";
import { Card, Col, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import IconButton from "components/common/IconButton";
import axiosInstance from "helpers/axios";
import TicketSubjectSelector from "./TicketSubjectSelector";

const FormValidation = ({ showTicketForm, setShowTicketForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [subjectOptions, setSubjectOptions] = useState([]);
  const [subjectLevels, setSubjectLevels] = useState([
    { parentId: null, selectedId: "" },
  ]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await axiosInstance.get("/ticketSubjects"); // Replace with your actual API
      setSubjectOptions(res.data);
    };
    fetchSubjects();
  }, []);

  const onSubmit = async (data) => {
    const selectedSubjectId = subjectLevels
      .map((l) => l.selectedId)
      .filter(Boolean)
      .pop(); // get deepest selected subject

    if (!selectedSubjectId) {
      alert("Please select a ticket subject.");
      return;
    }
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        const value = data[key];

        if (value instanceof FileList) {
          // Handle multiple files
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        } else if (value instanceof File) {
          // Handle single file
          formData.append(key, value);
        } else {
          // Handle normal text fields
          formData.append(key, value);
        }
      });

      formData.append("subjectId", selectedSubjectId);

      // log formData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axiosInstance.post("/tickets/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Success:", response.data);
      alert("Ticket created successfully!");
      // setShowTicketForm(false);
      // reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error creating ticket.");
    }
  };

  return (
    <Col md={6}>
      {!showTicketForm ? (
        <div className="d-flex justify-content-center align-items-center">
          <IconButton
            variant="success"
            size="md"
            icon="plus"
            iconClassName="me-sm-1"
            className="me-2 mt-2"
            onClick={() => setShowTicketForm(true)}
          >
            <span className="d-none d-sm-inline-block">Create New Ticket</span>
          </IconButton>
        </div>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <h5 className="mb-3">Create New Ticket</h5>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formCategory">
                    <Form.Label>Category *</Form.Label>
                    <Form.Select
                      {...register("category", {
                        required: "Category is required",
                      })}
                    >
                      <option value="">Select Category...</option>
                      <option>General Info</option>
                      <option>Service</option>
                      <option>UMANG</option>
                    </Form.Select>
                    {errors.category && (
                      <span className="text-danger">
                        {errors.category.message}
                      </span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formSubCategory">
                    <Form.Label>Sub Category</Form.Label>
                    <Form.Select {...register("subCategory")}>
                      <option value="">Select Sub Category...</option>
                      <option>Laptop</option>
                      <option>Desktop</option>
                      <option>Printer</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formType">
                    <Form.Label>Issue Type *</Form.Label>
                    <Form.Select
                      {...register("issueType", {
                        required: "Issue type is required",
                      })}
                    >
                      <option value="">Select Issue Type...</option>
                      <option>General</option>
                      <option>Error</option>
                      <option>Feedback</option>
                    </Form.Select>
                    {errors.issueType && (
                      <span className="text-danger">
                        {errors.issueType.message}
                      </span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formAlternateMobileNumber">
                    <Form.Label>Alternate Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter alternate mobile number"
                      {...register("alternateMobile", {
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter a valid 10-digit number",
                        },
                      })}
                    />
                    {errors.alternateMobile && (
                      <span className="text-danger">
                        {errors.alternateMobile.message}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Group controlId="formSubjectHierarchy">
                    <Form.Label>Ticket Subject *</Form.Label>
                    <TicketSubjectSelector
                      subjects={subjectOptions}
                      levels={subjectLevels}
                      setLevels={setSubjectLevels}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Group controlId="formSubjectHierarchy">
                    <Form.Label>Source</Form.Label>
                    <Form.Select
                      {...register("source", {
                        required: "Issue Source is required",
                      })}
                    >
                      <option value="">Select Issue Type...</option>
                      <option>Email</option>
                      <option>IVR</option>
                      <option>Chat</option>
                    </Form.Select>
                    {errors.issueType && (
                      <span className="text-danger">
                        {errors.issueType.message}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Group controlId="formQueryDescription">
                    <Form.Label>Query Description *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Describe the issue in detail"
                      {...register("description", {
                        required: "Description is required",
                      })}
                    />
                    {errors.description && (
                      <span className="text-danger">
                        {errors.description.message}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Group controlId="formFileUpload">
                    <Form.Label>Add Attachment</Form.Label>
                    <Form.Control type="file" {...register("attachment")} />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Group controlId="formAssignTo">
                    <Form.Label>Criticality of Issue *</Form.Label>
                    <Form.Select
                      {...register("criticality", {
                        required: "Criticality is required",
                      })}
                    >
                      <option value="">Select Criticality of Issue...</option>
                      <option value="low">Routine(P-2)</option>
                      <option value="high">Critical(P-1)</option>
                    </Form.Select>
                    {errors.criticality && (
                      <span className="text-danger">
                        {errors.criticality.message}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-end mt-4">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setShowTicketForm(false);
                    reset();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-warning me-2"
                  onClick={() => reset()}
                >
                  Reset
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
};

export default FormValidation;
