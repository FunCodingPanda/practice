import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title,
  LineSeries, RangeSelector, Tooltip
} from 'react-jsx-highstock';

class StockChart extends Component {
  render() {
    const { data, title } = this.props;

    return (
      <div className="chart">
        <HighchartsStockChart>
          <Chart zoomType="x" />

          <Title>{title}</Title>

          <RangeSelector>
            <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button>
            <RangeSelector.Button count={3} type="month">3m</RangeSelector.Button>
            <RangeSelector.Button count={6} type="month">6m</RangeSelector.Button>
            <RangeSelector.Button count={364} type="day" selected>1y</RangeSelector.Button>
            <RangeSelector.Input boxBorderColor="#7cb5ec" />
          </RangeSelector>

          <Tooltip />

          <XAxis>
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis>
            <YAxis.Title>Price (USD)</YAxis.Title>
            <LineSeries id="price" name="Price" data={data} />
          </YAxis>
        </HighchartsStockChart>
      </div>
    );
  }
}

export default withHighcharts(StockChart, Highcharts);
