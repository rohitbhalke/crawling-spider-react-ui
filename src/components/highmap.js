import React, { Component } from 'react'
import data  from '../data/worldMap'
import Highmaps from 'highcharts/highmaps'
import {
  HighchartsMapChart, withHighmaps, Title, Subtitle, Tooltip, MapSeries, MapNavigation, Credits
} from 'react-jsx-highmaps'

//
// export default class Analysis extends Component {
//
//   constructor() {
//     super();
//   }
//
//   render() {
//     let self = this;
//     return (
//       <HighchartsMapChart map={data}>
//         <MapSeries
//           name="No of tweets"
//           data={[
//             ['fr', 16000],
//             ['in', 10000],
//             ['us', 40000],
//             ['th', 28099],
//             ['mx', 40955]
//           ]}
//           dataLabels={{
//             enabled: true,
//             color: '#FFFFFF',
//             format: '{point.name}'
//           }}
//         />
//
//         <MapNavigation>
//           <MapNavigation.ZoomIn/>
//           <MapNavigation.ZoomOut/>
//         </MapNavigation>
//
//         <Tooltip/>
//       </HighchartsMapChart>
//     )
//   }
//
//
//
//   }

const HighMap = (data1) => (
  <div className="app">
            <HighchartsMapChart map={data}>
              <MapSeries
                name="No of tweets"
                data={data1.data}
                dataLabels={{
                  enabled: true,
                  color: '#FFFFFF',
                  format: '{point.name}'
                }}
              />

              <MapNavigation>
                <MapNavigation.ZoomIn/>
                <MapNavigation.ZoomOut/>
              </MapNavigation>

              <Tooltip/>
            </HighchartsMapChart>
  </div>
)

export default withHighmaps(HighMap, Highmaps)