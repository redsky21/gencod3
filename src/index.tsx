import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LicenseManager } from 'ag-grid-enterprise';

LicenseManager.setLicenseKey(
  'CompanyName=Geonwoo Solution Co.Ltd_on_behalf_of_LG Electronics Inc,LicensedGroup=Enterprise Task Support,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=10,LicensedProductionInstancesCount=0,AssetReference=AG-016785,ExpiryDate=5_July_2022_[v2]_MTY1Njk3NTYwMDAwMA==883cedbc56a08758c5a6508e61387f3a',
);

ReactDOM.render(
  <React.StrictMode>
    <div className="wrap">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
