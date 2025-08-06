import React, { useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import CardDropdown from 'components/common/CardDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubtleBadge from 'components/common/SubtleBadge';
import { Link } from 'react-router-dom';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import { recentPurchaseTableData } from 'data/dashboard/ecom';
import RecentPurchasesHeader from './RecentPurchasesHeader';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import paths from 'routes/paths';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { FaComments, FaEnvelope, FaPhone } from 'react-icons/fa';

const columns = [
  {
    accessorKey: 'ticketNo',
    header: 'Ticket No.',
    meta: {
      headerProps: { className: 'pe-1 sticky-column text-900' },
      cellProps: {
        className: 'fw-semibold'
      }
    },
    cell: ({ row: { original } }) => {
      const { ticketNo } = original;
      return <Link to={paths.contactDetails}>{ticketNo}</Link>;
    }
  },
  {
    accessorKey: 'customer',
    header: 'Name',
    meta: {
      headerProps: { className: 'pe-7 text-900' }
    }
  },
  {
    accessorKey: 'product',
    header: 'Complaint Type',
    meta: {
      headerProps: { className: 'text-900' }
    }
  },
  {
    accessorKey: 'amount',
    header: 'Total Complaints',
    meta: {
      headerProps: { className: 'text-center text-900' },
      cellProps: { className: 'text-center' }
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      headerProps: { className: 'text-center text-900' },
      cellProps: { className: 'fs-9' }
    },
    cell: ({ row: { original } }) => {
      const { status } = original;
      return (
        <SubtleBadge pill bg={status.type} className="d-block">
          {status.content}
          <FontAwesomeIcon
            icon={status.icon}
            transform="shrink-2"
            className="ms-1"
          />
        </SubtleBadge>
      );
    }
  },
  {
    accessorKey: 'lastComplaintDate',
    header: 'Last Complaint Date',
    meta: {
      headerProps: {
        className: 'text-center text-900'
      },
      cellProps: {
        className: 'text-center'
      }
    }
  },
  {
    accessorKey: 'channel',
    header: 'Mode',
    meta: {
      cellProps: {
        className: 'text-center'
      },
      headerProps: {
        className: 'text-center text-800'
      }
    },
    cell: ({ row: { original } }) => {
      const { channel } = original;
      const iconSize = 16;

      const iconMap = {
        Chat: <FaComments color="#27BCFD" size={iconSize} title="Chat" />,
        Email: <FaEnvelope color="#E7405F" size={iconSize} title="Email" />,
        IVR: <FaPhone color="#00D27A" size={iconSize} title="IVR" />
      };

      return iconMap[channel] || null;
    }
  },
  {
    accessorKey: 'none',
    header: '',
    enableSorting: false,
    meta: {
      cellProps: {
        className: 'text-end py-2'
      }
    },
    cell: () => {
      return (
        <CardDropdown drop="start">
          <div className="py-2">
            <Dropdown.Item href="#!">View</Dropdown.Item>
            <Dropdown.Item href="#!">Edit</Dropdown.Item>
            <Dropdown.Item href="#!">Refund</Dropdown.Item>
            <Dropdown.Divider as="div" />
            <Dropdown.Item href="#!" className="text-warning">
              Archive
            </Dropdown.Item>
            <Dropdown.Item href="#!" className="text-danger">
              Delete
            </Dropdown.Item>
          </div>
        </CardDropdown>
      );
    }
  },
];

const RecentPurchases = () => {
  const [data] = useState(recentPurchaseTableData);
  const table = useAdvanceTable({
    data,
    columns,
    selection: true,
    sortable: true,
    pagination: true,
    perPage: 15
  });

  return (
    <AdvanceTableProvider {...table}>
      <Card>
        <Card.Header>
          <RecentPurchasesHeader />
        </Card.Header>
        <Card.Body className="p-0">
          <AdvanceTable
            headerClassName="bg-200 text-nowrap align-middle"
            rowClassName="btn-reveal-trigger text-nowrap align-middle"
            tableProps={{
              size: 'sm',
              className: 'fs-10 mb-0 overflow-hidden'
            }}
          />
        </Card.Body>
        <Card.Footer>
          <AdvanceTableFooter rowInfo navButtons />
        </Card.Footer>
      </Card>
    </AdvanceTableProvider>
  );
};

export default RecentPurchases;
