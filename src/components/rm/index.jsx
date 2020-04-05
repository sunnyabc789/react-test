/* React */
import React, { useState } from "react";
/* Muuri-react */
import { MuuriComponent } from "muuri-react";
/* Utils & components */
import { useFilter, generateItems, layoutOptions } from "./utils";
import { Select, Header, Footer, Button, Input, Demo } from "./components";
/* Style */
import "./style.css";
// App.
export default function App() {
  // Items state.
  const [items, setItems] = useState(generateItems());

  // Sort state.
  const [sort, setSort] = useState({
    value: "title",
    options: { descending: false }
  });

  // Filter state.
  const [filter, setFilter] = useState({
    search: "",
    value: "all"
  });

  // Filter method.
  const filterFunction = useFilter(filter.value, filter.search);

  // Children.
  const children = items.map(({ id, color, title, width, height }) => (
    <Item
      key={id}
      color={color}
      title={title}
      width={width}
      height={height}
      remove={() => setItems(items.filter(item => item.id !== id))}
    />
  ));

  return (
    <Demo>
      {/* Header */}
      <Header>
        <Input
          actionClass={"search"}
          icon={"&#xE8B6;"}
          onKeyUp={e => setFilter({ ...filter, search: e.target.value })}
        />
        <Select
          actionClass={"filter"}
          values={["All", "Red", "Blue", "Green"]}
          icon={"&#xE152;"}
          onChange={e => setFilter({ ...filter, value: e.target.value })}
        />
        <Select
          actionClass={"sort"}
          values={["Title", "Color"]}
          icon={"&#xE164;"}
          onChange={e => setSort({ ...sort, value: e.target.value })}
        />
      </Header>
      {/* Content */}
      <MuuriComponent
        {...layoutOptions}
        propsToData={({ color, title }) => ({ color, title })}
        filter={filterFunction}
        sort={sort.value}
        sortOptions={sort.options}
      >
        {children}
      </MuuriComponent>
      {/* Footer */}
      <Footer>
        <Button
          text={"Add more items"}
          icon={"&#xE145;"}
          onClick={() =>
            setItems(Array.prototype.concat(items, generateItems()))
          }
        />
      </Footer>
    </Demo>
  );
};

// Item component.
const Item = ({ color, width, height, title, remove }) => {
  return (
    <div className={`item h${height} w${width} ${color}`}>
      <div className="item-content">
        <div className="card">
          <div className="card-title">{title}</div>
          <div className="card-remove">
            <i className="material-icons" onMouseDown={remove}>
              &#xE5CD;
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};