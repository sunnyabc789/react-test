import React from "react";

// Select component.
export const Select = ({ actionClass, values, icon, onChange }) => {
  return (
    <div className={"control " + actionClass}>
      <div className="control-icon">
        <i
          className="material-icons"
          dangerouslySetInnerHTML={{ __html: icon }}
        />
      </div>
      <div className="select-arrow">
        <i className="material-icons">&#xE313;</i>
      </div>
      <select
        className="control-field filter-field form-control"
        onChange={onChange}
        defaultValue={values[0]}
      >
        {values.map((value, i) => (
          <option key={i} value={value.toLowerCase()}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

// Input component.
export const Input = ({ actionClass, icon, onKeyUp }) => {
  return (
    <div className={"control " + actionClass}>
      <div className="control-icon">
        <i
          className="material-icons"
          dangerouslySetInnerHTML={{ __html: icon }}
        />
      </div>
      <input
        className={"control-field search-field form-control"}
        onKeyUp={onKeyUp}
        type="text"
        placeholder={"Search..."}
      />
    </div>
  );
};

// Button component.
export const Button = ({ text, icon, onClick }) => {
  return (
    <button className="add-more-items btn btn-primary" onClick={onClick}>
      <i
        className="material-icons"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      {text}
    </button>
  );
};

// Header component.
export const Header = ({ children }) => {
  return (
    <React.Fragment>
      <h2 className="section-title">
        <span>Grid demo</span>
      </h2>
      <div className="controls cf">{children}</div>
    </React.Fragment>
  );
};

// Footer component.
export const Footer = ({ children }) => {
  return <div className="grid-footer">{children}</div>;
};

// Demo component.
export const Demo = ({ children }) => {
  return <section className="grid-demo">{children}</section>;
};
