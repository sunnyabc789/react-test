export const value = {
  'transform': {
    'x': 30,
    'y': 300
  },
  'tree': [
    {
      '_id': 'SI-18165678',
      'key': 'SI-18165678',
      'title': '机车运用效率',
      mainIndexName: '机车运用效率指数',
      'desc': null,
      actualValue: 102.6,
      predictValue: 102.6,
      unit: '',
      children: [{
        '_id': 'SI-1816567',
        'key': 'SI-1816567',
        'title': '机车产量',
        unit: '吨公里/台日',
        mainIndexName: '运用机车日产量',
        actualValue: 672.6,
        predictValue: 672.6,
        'desc': null,
        children: [{
          '_id': 'SI-56415489',
          'key': 'SI-56415489',
          'title': '运输能力',
          mainIndexName: '运输能力指数',
          actualValue: 111.5,
          predictValue: 111.5,
          expand: 'underline-node',
          'desc': null,
          children: [{
            '_id': 'SI-7563453',
            'key': 'SI-7563453',
            'title': '可运用机车数量',
            unit: '台日',
            mainIndexName: '运用机车日产量',
            actualValue: 45591.3,
            predictValue: 45591.3,
            expand: 'underline-node',
            'desc': null,
          },{
            '_id': 'SI-56345123',
            'key': 'SI-56345123',
            'title': '牵引工作量',
            unit: '千吨公里',
            mainIndexName: '各种运输总重吨公里（千）',
            actualValue: 49084589,
            predictValue: 49084589,
            expand: 'underline-node',
            'desc': null,
            children: [{
              '_id': 'SI-563451237897',
              'key': 'SI-563451237897',
              'title': '走行公里',
              'expectDesc': 'warn',
              unit: '公里/台日',
              mainIndexName: '本务机车日车公里',
              actualValue: 4017,
              predictValue: 4017,
              expand: 'alarm-node',
              'desc': null,
            },{
              '_id': 'SI-56345123787',
              'key': 'SI-56345123787',
              'title': '运输重量',
              unit: '吨',
              mainIndexName: '机车平均牵引总重',
              actualValue: 12149,
              predictValue: 12149,
              expand: 'underline-node',
              'desc': null,
            }]
          }]
        },{
          '_id': 'SI-56414489',
          'key': 'SI-56414489',
          'title': '运输调度',
          mainIndexName: '运输调度指数',
          actualValue: 88.3,
          predictValue: 88.3,
          expand: 'underline-node',
          'desc': null,
          children: [{
            '_id': 'SI-56414487878',
            'key': 'SI-56414487878',
            'title': '单机',
            'expectDesc': 'warn',
            unit: '%',
            mainIndexName: '单机率',
            actualValue: 43.5,
            predictValue: 43.5,
            expand: 'alarm-node',
            'desc': null,
          },{
            '_id': 'SI-5641487878',
            'key': 'SI-5641487878',
            'title': '重联',
            unit: '%',
            mainIndexName: '重联率',
            actualValue: 1.2,
            predictValue: 1.2,
            expand: 'underline-node',
            'desc': null,
          },{
            '_id': 'SI-6414487878',
            'key': 'SI-6414487878',
            'title': '补机',
            unit: '%',
            mainIndexName: '补机率',
            actualValue: 0,
            predictValue: 0,
            expand: 'underline-node',
            'desc': null,
          },{
            '_id': 'SI-544487878',
            'key': 'SI-544487878',
            'title': '超重',
            unit: '千吨公里',
            mainIndexName: '超重列车吨公里（千）',
            actualValue: 82746,
            predictValue: 82746,
            expand: 'underline-node',
            'desc': null,
          },{
            '_id': 'SI-14487878',
            'key': 'SI-14487878',
            'title': '欠重',
            unit: '千吨公里',
            mainIndexName: '欠重列车吨公里（千）',
            actualValue: 72059,
            predictValue: 72059,
            expand: 'underline-node',
            'desc': null,
          },{
            '_id': 'SI-1448788',
            'key': 'SI-1448788',
            'title': '欠编',
            unit: '千吨公里',
            mainIndexName: '欠编列车(直通直达）吨公里（千）',
            actualValue: 358722,
            predictValue: 358722,
            expand: 'underline-node',
            'desc': null,
          }]
        }]
      }, {
        '_id': 'SI-181656',
        'key': 'SI-181656',
        'title': '周转能力',
        'expectDesc': 'warn',
        unit: '分',
        mainIndexName: '全周转时间（平均)',
        actualValue: 111.3,
        predictValue: 111.3,
        'desc': null,
        children: [
          {
            '_id': 'SI-18165',
            'key': 'SI-18165',
            'title': '周转速度',
            unit: '公里/分',
            mainIndexName: '机车技术速度',
            actualValue: 416.2,
            predictValue: 416.2,
            expand: 'underline-node',
            'desc': null
          }, {
            '_id': 'SI-18166',
            'key': 'SI-18166',
            'title': '周转距离',
            unit: '公里',
            mainIndexName: '周转距离',
            actualValue: 3043,
            predictValue: 3043,
            expand: 'underline-node',
            'desc': null
          }, {
            '_id': 'SI-18656',
            'key': 'SI-18656',
            'title': '在途停留',
            unit: '分',
            mainIndexName: '总停留时间',
            actualValue: 664715.9,
            predictValue: 664715.9,
            expand: 'underline-node',
            'desc': null,
            children: [{
              '_id': 'SI-1816',
              'key': 'SI-1816',
              'title': '中间站停留',
              unit: '分',
              mainIndexName: '中停时间',
              actualValue: 115117.3,
              predictValue: 115117.3,
              expand: 'underline-node',
              'desc': null
            }, {
              '_id': 'SI-181',
              'key': 'SI-181',
              'title': '本段停留',
              unit: '分',
              mainIndexName: '本段停留时间',
              actualValue: 198243,
              predictValue: 198243,
              expand: 'underline-node',
              'desc': null
            }, {
              '_id': 'SI-181444',
              'key': 'SI-181444',
              'title': '本站停留',
              unit: '分',
              mainIndexName: '本站停留时间',
              actualValue: 74789,
              predictValue: 74789,
              expand: 'underline-node',
              'desc': null
            }, {
              '_id': 'SI-181441231234',
              'key': 'SI-181441231234',
              'title': '外段停留',
              unit: '分',
              mainIndexName: '外段停留时间',
              actualValue: 126631,
              predictValue: 126631,
              expand: 'underline-node',
              'desc': null
            }, {
              '_id': 'SI-184564561444',
              'key': 'SI-184564561444',
              'title': '外站停留',
              unit: '分',
              mainIndexName: '外站停留时间',
              actualValue: 146000.6,
              predictValue: 146000.6,
              expand: 'underline-node',
              'desc': null
            }, {
              '_id': 'SI-18456451444',
              'key': 'SI-18456451444',
              'title': '机外停留',
              'expectDesc': 'warn',
              unit: '分',
              mainIndexName: '机外停车时间（分）',
              actualValue: 3935,
              predictValue: 3935,
              expand: 'alarm-node',
              'desc': null
            }]
          }
        ]
      },
  
      //单元测试
      // {
      //   '_id': 'SI-8465432',
      //   'key': 'SI-8465432',
      //   title: '智能因素',
      //   mainIndexName: '测试1',
      //   actualValue: 3935,
      //   predictValue: 3935,
      //   desc: null,
      //   children: [{
      //     '_id': 'SI-84654321',
      //     'key': 'SI-84654321',
      //     title: '车辆运用效率',
      //     mainIndexName: '测试2',
      //     actualValue: 6000,
      //     predictValue: 6000,
      //     expand: 'underline-node',
      //     desc: null,
      //     children: [{
      //         '_id': 'SI-846521',
      //         'key': 'SI-846521',
      //         title: '测试5',
      //         mainIndexName: '测试5',
      //         actualValue: 8000,
      //         predictValue: 8000,
      //         expand: 'underline-node',
      //         desc: null,
      //       },
      //       {
      //         '_id': 'SI-846fgdg',
      //         'key': 'SI-846fgdg',
      //         title: '测试6',
      //         mainIndexName: '测试6',
      //         actualValue: 8000,
      //         predictValue: 8000,
      //         expand: 'underline-node',
      //         desc: null,
      //         children: [{
      //           '_id': 'SI-vbcvb',
      //           'key': 'SI-vbcvb',
      //           title: '测试7',
      //           mainIndexName: '测试7',
      //           actualValue: 8000,
      //           predictValue: 8000,
      //           expand: 'underline-node',
      //           desc: null
      //         },{
      //           '_id': 'SI-vbc1vb',
      //           'key': 'SI-vbc1vb',
      //           title: '测试8',
      //           mainIndexName: '测试8',
      //           actualValue: 8000,
      //           predictValue: 8000,
      //           expand: 'underline-node',
      //           desc: null
      //         }]
      //       }]
      //   },{
      //     '_id': 'SI-84654322',
      //     'key': 'SI-84654322',
      //     title: '测试3',
      //     mainIndexName: '测试3',
      //     actualValue: 8000,
      //     predictValue: 8000,
      //     expand: 'underline-node',
      //     desc: null,
      //   }]
      // }


    ]
    }
  ]
}



// export const value = {
//   'transform': {
//     'x': 244.8,
//     'y': 427
//   },
//   'tree': [
//     {
//       '_id': 'SI-18165678',
//       'key': 'SI-18165678',
//       'title': '机车运用效率',
//       mainIndexName: '机车运用效率指数',
//       'desc': null,
//       actualValue: 102.6,
//       predictValue: 102.6,
//       unit: '',
//       children: [{
//         '_id': 'SI-1816567weight',
//         'key': 'SI-1816567weight',
//         'title': '权重系数',
   
//         'desc': null,
//         children: [{
//           '_id': 'SI-1816567',
//           'key': 'SI-1816567',
      
//           'title': '机车产量',
//           unit: '吨公里/台日',
//           mainIndexName: '运用机车日产量',
//           actualValue: 672.6,
//           predictValue: 672.6,
//           'desc': null,
//           children: [{
//             '_id': 'SI-56415489',
//             'key': 'SI-56415489',
//             'title': '运输能力',
//             mainIndexName: '运输能力指数',
//             actualValue: 111.5,
//             predictValue: 111.5,
            
//             'desc': null,
//             children: [{
//               '_id': 'SI-7563453',
//               'key': 'SI-7563453',
//               'title': '可运用机车数量',
//               unit: '台日',
//               mainIndexName: '运用机车日产量',
//               actualValue: 45591.3,
//               predictValue: 45591.3,
              
//               'desc': null,
//             },{
//               '_id': 'SI-56345123',
//               'key': 'SI-56345123',
//               'title': '牵引工作量',
//               unit: '千吨公里',
//               mainIndexName: '各种运输总重吨公里（千）',
//               actualValue: 49084589,
//               predictValue: 49084589,
              
//               'desc': null,
//               children: [{
//                 '_id': 'SI-563451237897',
//                 'key': 'SI-563451237897',
//                 'title': '走行公里',
//                 'expectDesc': 'warn',
//                 unit: '公里/台日',
//                 mainIndexName: '本务机车日车公里',
//                 actualValue: 4017,
//                 predictValue: 4017,
            
//                 'desc': null,
//               },{
//                 '_id': 'SI-56345123787',
//                 'key': 'SI-56345123787',
//                 'title': '运输重量',
//                 unit: '吨',
//                 mainIndexName: '机车平均牵引总重',
//                 actualValue: 12149,
//                 predictValue: 12149,
                
//                 'desc': null,
//               }]
//             }]
//           },{
//             '_id': 'SI-56414489',
//             'key': 'SI-56414489',
//             'title': '运输调度',
//             mainIndexName: '运输调度指数',
//             actualValue: 88.3,
//             predictValue: 88.3,
            
//             'desc': null,
//             children: [{
//               '_id': 'SI-56414487878',
//               'key': 'SI-56414487878',
//               'title': '单机',
//               'expectDesc': 'warn',
//               unit: '%',
//               mainIndexName: '单机率',
//               actualValue: 43.5,
//               predictValue: 43.5,
          
//               'desc': null,
//             },{
//               '_id': 'SI-5641487878',
//               'key': 'SI-5641487878',
//               'title': '重联',
//               unit: '%',
//               mainIndexName: '重联率',
//               actualValue: 1.2,
//               predictValue: 1.2,
              
//               'desc': null,
//             },{
//               '_id': 'SI-6414487878',
//               'key': 'SI-6414487878',
//               'title': '补机',
//               unit: '%',
//               mainIndexName: '补机率',
//               actualValue: 0,
//               predictValue: 0,
              
//               'desc': null,
//             },{
//               '_id': 'SI-544487878',
//               'key': 'SI-544487878',
//               'title': '超重',
//               unit: '千吨公里',
//               mainIndexName: '超重列车吨公里（千）',
//               actualValue: 82746,
//               predictValue: 82746,
              
//               'desc': null,
//             },{
//               '_id': 'SI-14487878',
//               'key': 'SI-14487878',
//               'title': '欠重',
//               unit: '千吨公里',
//               mainIndexName: '欠重列车吨公里（千）',
//               actualValue: 72059,
//               predictValue: 72059,
              
//               'desc': null,
//             },{
//               '_id': 'SI-1448788',
//               'key': 'SI-1448788',
//               'title': '欠编',
//               unit: '千吨公里',
//               mainIndexName: '欠编列车(直通直达）吨公里（千）',
//               actualValue: 358722,
//               predictValue: 358722,
              
//               'desc': null,
//             }]
//           }]
//         }]
//       }, {
//         '_id': 'SI-181656',
//         'key': 'SI-181656',
//         'title': '周转能力',
//         'expectDesc': 'warn',
//         unit: '分',
//         mainIndexName: '全周转时间（平均)',
//         actualValue: 111.3,
//         predictValue: 111.3,
//         'desc': null,
//         children: [
//           {
//             '_id': 'SI-18165',
//             'key': 'SI-18165',
//             'title': '周转速度',
//             unit: '公里/分',
//             mainIndexName: '机车技术速度',
//             actualValue: 416.2,
//             predictValue: 416.2,
            
//             'desc': null
//           }, {
//             '_id': 'SI-18166',
//             'key': 'SI-18166',
//             'title': '周转距离',
//             unit: '公里',
//             mainIndexName: '周转距离',
//             actualValue: 3043,
//             predictValue: 3043,
            
//             'desc': null
//           }, {
//             '_id': 'SI-18656',
//             'key': 'SI-18656',
//             'title': '在途停留',
//             unit: '分',
//             mainIndexName: '总停留时间',
//             actualValue: 664715.9,
//             predictValue: 664715.9,
            
//             'desc': null,
//             children: [{
//               '_id': 'SI-1816',
//               'key': 'SI-1816',
//               'title': '中间站停留',
//               unit: '分',
//               mainIndexName: '中停时间',
//               actualValue: 115117.3,
//               predictValue: 115117.3,
              
//               'desc': null
//             }, {
//               '_id': 'SI-181',
//               'key': 'SI-181',
//               'title': '本段停留',
//               unit: '分',
//               mainIndexName: '本段停留时间',
//               actualValue: 198243,
//               predictValue: 198243,
              
//               'desc': null
//             }, {
//               '_id': 'SI-181444',
//               'key': 'SI-181444',
//               'title': '本站停留',
//               unit: '分',
//               mainIndexName: '本站停留时间',
//               actualValue: 74789,
//               predictValue: 74789,
              
//               'desc': null
//             }, {
//               '_id': 'SI-181441231234',
//               'key': 'SI-181441231234',
//               'title': '外段停留',
//               unit: '分',
//               mainIndexName: '外段停留时间',
//               actualValue: 126631,
//               predictValue: 126631,
              
//               'desc': null
//             }, {
//               '_id': 'SI-184564561444',
//               'key': 'SI-184564561444',
//               'title': '外站停留',
//               unit: '分',
//               mainIndexName: '外站停留时间',
//               actualValue: 146000.6,
//               predictValue: 146000.6,
              
//               'desc': null
//             }, {
//               '_id': 'SI-18456451444',
//               'key': 'SI-18456451444',
//               'title': '机外停留',
//               'expectDesc': 'warn',
//               unit: '分',
//               mainIndexName: '机外停车时间（分）',
//               actualValue: 3935,
//               predictValue: 3935,
          
//               'desc': null
//             }]
//           }
//         ]
//       },{
//         '_id': 'SI-8465432',
//         'key': 'SI-8465432',
//         title: '智能因素',
//         desc: null,
//         children: [{
//           '_id': 'SI-84654321',
//           'key': 'SI-84654321',
//           title: '车辆运用效率',
          
//           desc: null,
//         }]
//       }]
//     }
//   ]
// }























