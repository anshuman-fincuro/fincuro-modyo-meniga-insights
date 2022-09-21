import React, { Component } from "react";
import "./../style/Base.css";
import "./../App.css";


class BillingTable extends Component {
  render() {
    return (
      <div className="billingTable-wrapper">
         <div className="billingTable-heading">September</div>
         {/* billingTable row start  */}
         <div className="billingTable-row">
          <div className="billingTable-left">
          <div className="billingTable-icon">a</div>
          <div className="billingTable-date"> <span>19</span> <span>sep</span></div>
         </div>
         <div className="billingTable-right">
          <div className="billingTable-right-text-wrapper">
         <div className="billingTable-right-text">London Car Parking</div>
         <div className="billingTable-right-dropdown">Parking</div>
         </div>
         <div className="billingTable-TransactionAmount">£ -5.00</div>
         </div>
         </div>
         {/* billingTable row end  */}
      </div>
    );
  }
}

export default BillingTable;
