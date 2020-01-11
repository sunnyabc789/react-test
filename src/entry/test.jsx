import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';
import {dataSource} from './data'
import {columns} from './columns'


const mockTags = ['cat', 'dog', 'bird'];

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 4 === 0,
    tag: mockTags[i % 3],
  });
}

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
    render: tag => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
];

export default class TableTransferClass extends React.Component {
  state = {
    targetKeys: originTargetKeys,
    disabled: false,
    showSearch: false,
  };

  onChange = nextTargetKeys => {
    //按左右时会触发
    this.setState({ targetKeys: nextTargetKeys });
  };

  triggerDisable = disabled => {
    this.setState({ disabled });
  };

  triggerShowSearch = showSearch => {
    this.setState({ showSearch });
  };

  dataSource = dataSource.map( (i,idx) => ({
    ...i,
    key: 'test-' + idx
  }))
  render() {
    const { targetKeys, disabled, showSearch } = this.state;
    return (
      <div>
        <Transfer
          dataSource={dataSource}
          // targetKeys={targetKeys}
          disabled={disabled}
          showSearch={showSearch}
          // onChange={this.onChange}
          // filterOption={(inputValue, item) =>
          //   item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          // }
        >
          {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
          }) => {
            // const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection = {
              getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
              onSelectAll(selected, selectedRows) {
                const treeSelectedKeys = selectedRows
                  .filter(item => !item.disabled)
                  .map(({ key }) => key);
                const diffKeys = selected
                  ? difference(treeSelectedKeys, listSelectedKeys)
                  : difference(listSelectedKeys, treeSelectedKeys);
                onItemSelectAll(diffKeys, selected);
              },
              onSelect({ key }, selected) {
                //选择行时触发
                onItemSelect(key, selected);
              },
              selectedRowKeys: listSelectedKeys,
            };

            return (
              <Table
                rowSelection={rowSelection}
                columns={columns.map((col, i) => {
                  return Object.assign({}, col, {
                    title: (
                      <div
                        className="elli"
                        style={{width: col.width - 17}}
                      >{col.title}</div>
                    )
                  })
                })}
                dataSource={filteredItems.map( (i,idx) => ({...i,key: 'test-' + idx}))}
                size="small"
                style={{ pointerEvents: listDisabled ? 'none' : null }}
                onRow={({ key, disabled: itemDisabled }) => ({
                  onClick: () => {
                    if (itemDisabled || listDisabled) return;
                    onItemSelect(key, !listSelectedKeys.includes(key));
                  },
                })}
              />
            );
          }}
        </Transfer>
        <Switch
          unCheckedChildren="disabled"
          checkedChildren="disabled"
          checked={disabled}
          onChange={this.triggerDisable}
          style={{ marginTop: 16 }}
        />
        <Switch
          unCheckedChildren="showSearch"
          checkedChildren="showSearch"
          checked={showSearch}
          onChange={this.triggerShowSearch}
          style={{ marginTop: 16 }}
        />
      </div>
    );
  }
}