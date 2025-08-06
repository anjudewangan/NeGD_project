import React from 'react';
import { topPagesTableData } from 'data/dashboard/analytics';
import { buttonsTableData } from 'data/dashboard/analytics';
import TopPages from 'components/dashboards/analytics/top-pages/TopPages';
import Buttons from 'components/doc-components/Buttons';

const Badges = () => (
  <>
    <TopPages tableData={topPagesTableData} perPage={5} />
    <Buttons tableData={buttonsTableData} perPage={5} />
  </>
);

export default Badges;
