import React, { useState, useEffect } from "react";
import paths from "routes/paths";
import { Link } from "react-router-dom";
import useAdvanceTable from "./useAdvanceTable";
import Flex from "components/common/Flex";
import SubtleBadge from "components/common/SubtleBadge";
import Priority from "components/app/support-desk/tickets-layout/Priority";
import { Dropdown, Modal, Button, Form } from "react-bootstrap";
import CardDropdown from "components/common/CardDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "helpers/axios";
import { useAuth } from "providers/AuthProvider";
import { useTicketStore } from "store/useTicketStore";

const columns = (setSelectedTicket, setShowModal, setShowPriorityModal, setTicketId, setUpdatedPriority) => [
  {
    accessorKey: "ticketNumber",
    header: "Ticket No.",
    meta: {
      headerProps: { className: "ps-2 text-900", style: { height: "46px" } },
      cellProps: {
        className: "py-2 white-space-nowrap pe-3 pe-xxl-4 ps-2",
      },
    },
    cell: ({ row: { original } }) => {
      const { ticketId, _id } = original;
      return (
        <Flex alignItems="center" className="position-relative py-1">
          <Link
            to={`${paths.contactDetails}/${_id}`}
            onClick={() => setTicketId(_id)}
            className="fw-semibold"
          >
            Ticket #{ticketId}
          </Link>
        </Flex>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Caller",
    meta: {
      headerProps: { className: "ps-2 text-900", style: { height: "46px" } },
      cellProps: {
        className: "py-2 white-space-nowrap pe-3 pe-xxl-4 ps-2",
      },
    },
    cell: ({ row: { original } }) => {
      const { name } = original;
      return (
        <Flex alignItems="center" className="position-relative py-1">
          <h6 className="mb-0">{name}</h6>
        </Flex>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    meta: {
      headerProps: { className: "ps-2 text-900", style: { height: "46px" } },
      cellProps: {
        className: "py-2 white-space-nowrap pe-3 pe-xxl-4 ps-2",
      },
    },
    cell: ({ row: { original } }) => {
      const { createdAt } = original;
      return (
        <Flex alignItems="center" className="position-relative py-1">
          <h6 className="mb-0">{new Date(createdAt).toLocaleDateString()}</h6>
        </Flex>
      );
    },
  },
  {
    accessorKey: "subject",
    header: "Issue",
    meta: {
      headerProps: {
        style: { minWidth: "14.625rem" },
        className: "text-900",
      },
      cellProps: {
        className: "py-2 pe-4",
      },
    },
    cell: ({ row: { original } }) => {
      const { subject } = original;
      return (
        <Flex alignItems="center" className="position-relative py-1">
          <h6 className="mb-0">{subject}</h6>
        </Flex>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      headerProps: { className: "text-900" },
      cellProps: {
        className: "fs-9 pe-4",
      },
    },
    cell: ({ row: { original } }) => {
      const { statusHistory } = original;
      const status = statusHistory.slice(-1)[0].status;

      const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
          case "open":
            return "danger";
          case "closed":
            return "success";
          case "pending":
            return "warning";
          case "escalated":
            return "info";
          default:
            return "secondary";
        }
      };

      return (
        <SubtleBadge bg={getStatusColor(status)} className="me-2">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </SubtleBadge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    meta: {
      headerProps: { className: "text-900" },
      cellProps: {
        className: "pe-4",
      },
    },
    cell: ({ row: { original } }) => {
      const { priority } = original;
      const getPriorityData = (priority) => {
        switch (priority) {
          case "medium":
            return { color: "#2A7BE4", title: "Medium", data: 50 };
          case "low":
            return { color: "#00D27B", title: "Low", data: 25 };
          case "high":
            return { color: "#F68F57", title: "High", data: 85 };
          default:
            return { color: "#999", title: "Unknown", data: 0 };
        }
      };
      const priorityData = getPriorityData(priority);
      return (
        <Priority
          title={priorityData.title}
          color={priorityData.color}
          data={priorityData.data}
        />
      );
    },
  },
  {
    accessorKey: "mode",
    header: "Mode",
    meta: {
      headerProps: { className: "text-end text-900" },
      cellProps: {
        className: "text-end",
      },
    },
    cell: ({ row: { original } }) => {
      const { source } = original;
      const getIcon = (type) => {
        switch (type.toLowerCase()) {
          case "email":
            return (
              <FontAwesomeIcon
                icon="envelope"
                className="text-danger"
                title="Email"
              />
            );
          case "ivr":
            return (
              <FontAwesomeIcon
                icon="phone"
                className="text-success"
                title="IVR"
              />
            );
          case "chat":
            return (
              <FontAwesomeIcon
                icon="comments"
                className="text-info"
                title="Chat"
              />
            );
          default:
            return <span>{type}</span>;
        }
      };
      return (
        <Flex justifyContent="center" alignItems="center" className="py-1">
          {getIcon(source)}
        </Flex>
      );
    },
  },
  {
    accessorKey: "none",
    header: "",
    enableSorting: false,
    meta: {
      cellProps: {
        className: "text-end",
      },
    },
    cell: ({ row: { original } }) => {
      return (
        <CardDropdown drop="start">
          <div className="py-2">
            <Dropdown.Item
              onClick={() => {
                setSelectedTicket(original);
                setShowModal(true);
              }}
            >
              Update
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setSelectedTicket(original);
                setUpdatedPriority(original.priority || "");
                setShowPriorityModal(true);
              }}
            >
              Change Priority
            </Dropdown.Item>
            <Dropdown.Item>Forward</Dropdown.Item>
          </div>
        </CardDropdown>
      );
    },
  },
];

const useSupportDeskTable = (options) => {
  const {
    tickets: initialTickets,
    setTickets: setParentTickets,
    updateTickets,
    ...rest
  } = options;

  const [showModal, setShowModal] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedPriority, setUpdatedPriority] = useState("");
  const [remarks, setRemarks] = useState("");

  const [tickets, setTickets] = useState(initialTickets);
  const { selectedTicketId, setSelectedTicketId } = useTicketStore();
  const { token } = useAuth();

  useEffect(() => {
    setTickets(initialTickets);
  }, [initialTickets]);

  useEffect(() => {
    if (selectedTicket) {
      const currentStatus = selectedTicket.statusHistory.slice(-1)[0].status;
      setUpdatedStatus(currentStatus);
    }
  }, [selectedTicket]);

  const handleUpdate = async () => {
    if (!updatedStatus || !remarks.trim()) {
      alert("Status and Remarks are required");
      return;
    }

    const updatedTickets = tickets.map((ticket) =>
      ticket.ticketId === selectedTicket.ticketId
        ? {
          ...ticket,
          statusHistory: [
            ...ticket.statusHistory,
            { status: updatedStatus, updatedAt: new Date().toISOString() },
          ],
        }
        : ticket
    );

    await axiosInstance.put(
      `/tickets/update/${selectedTicket._id}`,
      { status: updatedStatus, remarks },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    updateTickets();
    if (setParentTickets) setParentTickets(updatedTickets);
    setShowModal(false);
  };

  const handlePriorityUpdate = async () => {
    if (!updatedPriority) {
      alert("Priority is required");
      return;
    }

    const updatedTickets = tickets.map((ticket) =>
      ticket.ticketId === selectedTicket.ticketId
        ? { ...ticket, priority: updatedPriority }
        : ticket
    );

    await axiosInstance.put(
      `/tickets/update-priority/${selectedTicket._id}`,
      { priority: updatedPriority },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    updateTickets();
    if (setParentTickets) setParentTickets(updatedTickets);
    setShowPriorityModal(false);
  };

  const table = useAdvanceTable({
    columns: columns(
      setSelectedTicket,
      setShowModal,
      setShowPriorityModal,
      setSelectedTicketId,
      setUpdatedPriority
    ),
    data: tickets,
    ...rest,
  });

  table.UpdateModal = (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="pending">Pending</option>
              <option value="escalated">Escalated</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );

  table.PriorityModal = (
    <Modal show={showPriorityModal} onHide={() => setShowPriorityModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Priority</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={updatedPriority}
              onChange={(e) => setUpdatedPriority(e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowPriorityModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handlePriorityUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return table;
};

export default useSupportDeskTable;
