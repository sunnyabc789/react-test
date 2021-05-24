
const rootElement = document.getElementById('container')



import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PerfTable, { calcColumnWidths } from '@alife/perf-table';

class App extends Component {
  constructor(props) {
    super(props);
    

    this.dataSource = [
        { prov: '湖北省', confirmed: 54406, cured: 4793, dead: 1457, t: '2020-02-15 19:52:02' },
        { prov: '广东省', confirmed: 1294, cured: 409, dead: 2, t: '2020-02-15 19:52:02' },
        { prov: '河南省', confirmed: 1212, cured: 390, dead: 13, t: '2020-02-15 19:52:02' },
        { prov: '浙江省', confirmed: 1162, cured: 428, dead: 0, t: '2020-02-15 19:52:02' },
        { prov: '湖南省', confirmed: 1001, cured: 417, dead: 2, t: '2020-02-15 19:52:02' },
    ];

    const arr = new Array(1000);
    this.dataSource = arr.fill({ 
        prov: '湖北省', 
        confirmed: 54406, 
        cured: 4793, 
        dead: 1457, 
        t: '2020-02-15 19:52:02' 
    });
    this.columns = [
        { code: 'prov', name: '省份', bold: true, ellipsis: true, width: 100 },
        // { code: 'confirmed', name: '确诊', align: 'right', sortable: true },
        // { code: 'cured', name: '治愈',  align: 'right' },
        // { code: 'dead', name: '死亡',  align: 'right' },
        { code: 't', name: '最后更新时间', width: 100 },
    ];

    console.log(calcColumnWidths(this.columns, this.dataSource));
    this.state = {
      widths:{
              prov: 100
      }
    }
  }
  
  render() {
    return (
     <div style={{width: '60vw'}}><PerfTable
        style={{ height: 400 ,overflow: 'auto' }}
        dataSource={this.dataSource}
        columns={this.columns}
        isZebra
        size="small"
        index
        rowSelection={{
            primaryKey: 'prov',
            onChange(args) {
                console.log('lei',args);
            }
        }}
        columnResize={{
            widths: this.state.widths,
            onChange: (widths) => {
                this.setState({
                  widths,
                })
            }
        }}
        operateColumn={{
            buttons: [
                { text: '详情' },
                () => ({ text: '编辑' }),
                () => <a>禁用</a>,
            ],
        }}
        useOuterBorder
        useVirtual={false}
        onSort={(...args) => console.log(...args)}
     /></div>
    );
  }
}

ReactDOM.render((
  <App />
), rootElement);