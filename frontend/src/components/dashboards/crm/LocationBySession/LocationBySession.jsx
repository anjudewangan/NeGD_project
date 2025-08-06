import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardDropdown from 'components/common/CardDropdown';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Flex from 'components/common/Flex';
import { Button, Card } from 'react-bootstrap';
import LocationBySessionTable from './LocationBySessionTable';
import DatamapsIndia from 'react-datamaps-india';
import { locationBySessionTableData } from 'data/dashboard/crm';

const LocationBySession = () => {
  const chartRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [maxZoomLevel] = useState(5);
  const [minZoomLevel] = useState(1);

  const handleMapReset = () => {
    if (chartRef.current?.getEchartsInstance) {
      chartRef.current.getEchartsInstance().dispatchAction({
        type: 'restore'
      });
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel < maxZoomLevel) {
      setZoomLevel(zoomLevel + 1);
    }
    if (chartRef.current?.getEchartsInstance) {
      chartRef.current.getEchartsInstance().setOption({
        series: {
          zoom: zoomLevel + 1
        }
      });
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > minZoomLevel) {
      setZoomLevel(zoomLevel - 1);
    }
    if (chartRef.current?.getEchartsInstance) {
      chartRef.current.getEchartsInstance().setOption({
        series: {
          zoom: zoomLevel - 1
        }
      });
    }
  };

  return (
    <Card className="h-100">
      <FalconCardHeader
        title="Location By Session"
        titleTag="h6"
        className="py-2"
        light
        endEl={
          <Flex>
            <div className="btn-reveal-trigger">
              <Button
                variant="link"
                size="sm"
                className="btn-reveal"
                type="button"
                onClick={handleMapReset}
              >
                <FontAwesomeIcon icon="sync-alt" />
              </Button>
            </div>
            <CardDropdown />
          </Flex>
        }
      />
      <Card.Body className="position-relative pb-0">
        <div style={{ position: 'relative', height: '550px', width: '100%' }}>
          <DatamapsIndia
            style={{ position: 'relative', left: '25%' }}
            regionData={{
              'Andaman & Nicobar Island': { value: 150 },
              'Andhra Pradesh': { value: 470 },
              'Arunanchal Pradesh': { value: 248 },
              Assam: { value: 528 },
              Bihar: { value: 755 },
              Chandigarh: { value: 95 },
              Chhattisgarh: { value: 1700 },
              Delhi: { value: 1823 },
              Goa: { value: 508 },
              Gujarat: { value: 624 },
              Haryana: { value: 1244 },
              'Himachal Pradesh': { value: 640 },
              'Jammu & Kashmir': { value: 566 },
              Jharkhand: { value: 814 },
              Karnataka: { value: 2482 },
              Kerala: { value: 899 },
              Lakshadweep: { value: 15 },
              'Madhya Pradesh': { value: 1176 },
              Maharashtra: { value: 727 },
              Manipur: { value: 314 },
              Meghalaya: { value: 273 },
              Mizoram: { value: 306 },
              Nagaland: { value: 374 },
              Odisha: { value: 395 },
              Puducherry: { value: 245 },
              Punjab: { value: 786 },
              Rajasthan: { value: 1819 },
              Sikkim: { value: 152 },
              'Tamil Nadu': { value: 2296 },
              Telangana: { value: 467 },
              Tripura: { value: 194 },
              'Uttar Pradesh': { value: 2944 },
              Uttarakhand: { value: 1439 },
              'West Bengal': { value: 1321 }
            }}
            hoverComponent={({ value }) => (
              <div>
                <div>
                  {value.name}
                </div>
                <div>
                 Sessions: {value.value} 
                </div>
              </div>
            )}
            mapLayout={{
              // title: '',
              legendTitle: 'Number of Sessions',
              startColor: '#b3d1ff',
              endColor: '#005ce6',
              hoverTitle: 'Count',
              noDataColor: '#f5f5f5',
              borderColor: '#8D8D8D',
              hoverColor: 'blue',
              hoverBorderColor: 'green',
              height: 10,
              width: 30
            }}
          />
        </div>

        {/* <div className="position-absolute top-0 border mt-3 border-200 rounded-3 bg-body-tertiary">
          <Button
            variant="link"
            size="sm"
            className="bg-100 rounded-bottom-0 px-2 text-700"
            onClick={handleZoomIn}
          >
            <FontAwesomeIcon icon="plus" className="fs-10" />
          </Button>
          <hr className="m-0 text-200" />
          <Button
            variant="link"
            size="sm"
            className="bg-100 rounded-top-0 px-2 text-700"
            onClick={handleZoomOut}
          >
            <FontAwesomeIcon icon="minus" className="fs-10" />
          </Button>
        </div> */}

        {/* <LocationBySessionTable data={locationBySessionTableData} /> */}
      </Card.Body>

      {/* <Card.Footer className="text-end py-1 px-x1">
        <p className="mb-0 fs-10">
          <span className="d-none d-sm-inline-block me-2">1 to 5 of 15</span>
          <span className="d-none d-sm-inline-block me-2">&mdash;</span>
          <Button variant="link" size="sm" className="px-0">
            View All
            <FontAwesomeIcon icon="chevron-right" className="ms-1 fs-11" />
          </Button>
        </p>
      </Card.Footer> */}
    </Card>
  );
};

export default LocationBySession;
