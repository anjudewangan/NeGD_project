import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import { Link } from 'react-router-dom';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import IconButton from 'components/common/IconButton';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import GreetingsDate from 'components/dashboards/crm/greetings/GreetingsDate';

const columns = [
  {
    accessorKey: 'courseId',
    header: 'Ticket No.',
    meta: {
      headerProps: { className: 'text-900' }
    },
    cell: ({ row: { original } }) => {
      const { courseId } = original;
      return (
        <Link to="#!" className="text-primary fw-semibold">
          TCKT#{courseId}
        </Link>
      );
    }
  },
  {
    accessorKey: 'invoice',
    header: 'Caller Name',
    meta: {
      headerProps: {
        className: 'fw-medium text-900'
      },
      cellProps: {
        className: 'pe-6 py-3'
      }
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      headerProps: {
        className: 'fw-medium text-900'
      },
      cellProps: {
        className: 'pe-6 py-3'
      }
    }
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    meta: {
      headerProps: {
        className: 'fw-medium text-900'
      },
      cellProps: {
        className: 'pe-6 py-3'
      }
    }
  },
    {
    accessorKey: 'language',
    header: 'Language',
    meta: {
      headerProps: { style: { minWidth: '200px' }, className: 'ps-5 text-900' },
      cellProps: { className: 'ps-5' }
    }
  },
  {
    accessorKey: 'date',
    header: 'Date & Time',
    meta: {
      headerProps: {
        className: 'text-end fw-medium text-900'
      },
      cellProps: {
        className: 'text-end py-3'
      }
    }
  },
  {
    accessorKey: 'amount',
    header: 'Call Duration',
    meta: {
      headerProps: {
        className: 'text-end fw-medium text-900 white-space-nowrap'
      },
      cellProps: {
        className: 'text-end py-3'
      }
    }
  },
  {
    accessorKey: 'callType',
    header: 'Call Type',
    meta: {
      headerProps: {
        className: 'text-end fw-medium text-900 white-space-nowrap'
      },
      cellProps: {
        className: 'text-end py-3'
      }
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      headerProps: {
        className: 'text-end fw-medium text-900 white-space-nowrap'
      },
      cellProps: {
        className: 'text-end py-3 font-sans-serif fw-medium'
      }
    },
    cell: ({ row: { original } }) => {
      const { color, status } = original;
      return <span className={`text-${color}`}>{status}</span>;
    }
  },
  {
    accessorKey: 'issue',
    header: 'Issue',
    meta: {
      headerProps: {
        className: 'text-end fw-medium text-900 white-space-nowrap'
      },
      cellProps: {
        className: 'text-end py-3'
      }
    }
  },
];

const PaymentHistory = ({ data, perPage = 5 }) => {
  const table = useAdvanceTable({
    data,
    columns,
    sortable: true,
    pagination: true,
    perPage
  });

  return (
    <AdvanceTableProvider {...table}>
      <Card className="h-100">
        <Card.Header className="p-3 border-bottom bg-light">
          <div className="row g-2 align-items-center">

            {/* Column 1: Search */}
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Search by Caller or Ticket No."
                className="form-control form-control-sm"
              />
            </div>

            {/* Column 2: Date Range */}
            <div className="col-md-4 d-flex align-items-center">
              <GreetingsDate />
            </div>

            {/* Column 3: Status & Buttons */}
            <div className="col-md-4 d-flex align-items-center justify-content-md-end gap-2">
              <select className="form-select form-select-sm" style={{ maxWidth: '150px' }}>
                <option value="">Status</option>
                <option value="Closed">Closed</option>
                <option value="Escalated">Escalated</option>
                <option value="Pending">Pending</option>
              </select>

              <IconButton
                variant="falcon-default"
                size="sm"
                icon="filter"
                iconClassName="me-sm-1"
              >
                <span className="d-none d-sm-inline-block">Filter</span>
              </IconButton>

              <IconButton
                variant="falcon-default"
                size="sm"
                icon="external-link-alt"
                iconClassName="me-sm-1"
              >
                <span className="d-none d-sm-inline-block">Export</span>
              </IconButton>
            </div>

          </div>
        </Card.Header>

        <Card.Body className="p-0">
          <AdvanceTable
            headerClassName="bg-body-tertiary fw-medium font-sans-serif"
            rowClassName="align-middle white-space-nowrap"
            tableProps={{
              className: 'fs-10 mb-0 overflow-hidden fw-semibold'
            }}
          />
        </Card.Body>
        <Card.Footer className="bg-body-tertiary d-flex align-items-center justify-content-end py-2">
          <AdvanceTableFooter rowInfo viewAllBtn />
        </Card.Footer>
      </Card>
    </AdvanceTableProvider>
  );
};

PaymentHistory.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      courseId: PropTypes.string.isRequired,
      invoice: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  perPage: PropTypes.number
};

export default PaymentHistory;
