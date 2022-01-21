import React from "react";

export default function Collection() {
  return (
    <div className="collection">
      <div className="header">
        <h2>All</h2>
        <div className="ellipsis">&#8230;</div>
      </div>
      <div className="list">
        <div className="list-card">Random content</div>
        <div className="list-card">Random content</div>
        <div className="list-card">Random content</div>
        <div className="list-card">Random content</div>
        <div className="list-card">Random content</div>
        <div className="list-card">Random content</div>
      </div>
      <div className="addItem">
        + Add a Card
      </div>
    </div>
  );
}
