import React, { useState, useEffect } from "react";
import "../../styles/dashboardPage.css";

export const DashboardHome = () => {
  return (
    <div>
      <div className="card">
        <h5 className="card-header">Featured</h5>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <div className="card text-bg-primary mb-3" style={{"max-width": "18rem"}}>
        <div className="card-header">Header</div>
        <div className="card-body">
          <h5 className="card-title">Primary card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
  )
}
