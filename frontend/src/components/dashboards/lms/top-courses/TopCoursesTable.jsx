import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { FaStar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const columns = [
  {
    accessorKey: 'agentName',
    header: 'Agent Name',
    meta: {
      headerProps: { className: 'pe-1 fw-medium text-900' }
    }
  },
    {
    accessorKey: 'agentId',
    header: 'Agent ID',
    meta: {
      headerProps: { className: 'pe-1 fw-medium text-900' },
      cellProps: { className: 'text-900' }
    }
  },
  {
    accessorKey: 'totalTickets',
    header: 'Total Tickets',
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center' }
    }
  },
  {
    accessorKey: 'closedTickets',
    header: 'Closed Tickets',
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center' }
    }
  },
  {
    accessorKey: 'openTickets',
    header: 'Open Tickets',
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center' }
    }
  },
  {
    accessorKey: 'fcr',
    header: 'FCR',
    cell: info => {
      const value = parseFloat(info.getValue().replace('%', ''));
      const isHigh = value >= 85;
      return (
        <div className="text-end d-flex justify-content-end align-items-center gap-1">
          {isHigh ? (
            <FaCheckCircle className="text-success" />
          ) : (
            <FaTimesCircle className="text-danger" />
          )}
          <span>{info.getValue()}</span>
        </div>
      );
    },
    meta: {
      headerProps: { className: 'text-end fw-medium text-900' },
      cellProps: { className: 'text-end' }
    }
  },
  {
    accessorKey: 'frt',
    header: 'FRT',
    meta: {
      headerProps: { className: 'text-end fw-medium text-900' },
      cellProps: { className: 'text-end' }
    }
  },
  {
    accessorKey: 'aht',
    header: 'AHT',
    meta: {
      headerProps: { className: 'text-end fw-medium text-900' },
      cellProps: { className: 'text-end' }
    }
  },
  {
    accessorKey: 'csat',
    header: 'CSAT',
    cell: info => {
      const value = parseFloat(info.getValue());
      const stars = Math.round(value);

      return (
        <div className="text-end d-flex justify-content-end align-items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < stars ? 'text-warning' : 'text-300'} />
          ))}
          <span className="ms-1">{value.toFixed(1)}</span>
        </div>
      );
    },
    meta: {
      headerProps: { className: 'text-end fw-medium text-900' },
      cellProps: { className: 'text-end' }
    }
  }
];

const TopCoursesTable = ({ tableData }) => {
  const [data] = useState(tableData);
  const table = useAdvanceTable({
    data,
    columns,
    sortable: true
  });

  return (
    <AdvanceTableProvider {...table}>
      <AdvanceTable
        headerClassName="bg-200 text-nowrap align-middle font-sans-serif"
        rowClassName="btn-reveal-trigger text-nowrap align-middle"
        tableProps={{ className: 'fs-10 fw-semibold mb-0 overflow-hidden' }}
      />
    </AdvanceTableProvider>
  );
};

TopCoursesTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TopCoursesTable;
