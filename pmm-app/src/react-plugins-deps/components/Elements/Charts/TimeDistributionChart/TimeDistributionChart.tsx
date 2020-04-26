import React from 'react';
import HSBar from 'react-horizontal-stacked-bar-chart';
import { Humanize } from '../../../../helpers/Humanization';
import { DATABASE } from '../../../../../pmm-qan-app-panel/components/Details/Details.constants';

const TIME_METRICS = [
  'lock_time',
  'query_time',
  'blk_read_time',
  'blk_write_time',
  'innodb_io_r_wait',
  'innodb_queue_wait',
  'innodb_rec_lock_wait',
];

const METRICS_COLORS = {
  lock_time: '#be1818',
  blk_read_time: '#4e378c',
  blk_write_time: '#fcc200',
  innodb_io_r_wait: '#3c3c3c',
  innodb_queue_wait: '#7e4291',
  innodb_rec_lock_wait: '#e97e03',
};

const PERCENT_COUNT = 100;

const TimeDistributionChart = ({ data, databaseType }) => {
  let totalValue = 0;
  const timeMetrics = data.filter(metric => {
    if (metric.metricName === 'query_time') {
      totalValue = metric.metric.sum;
      return false;
    }

    if (databaseType === DATABASE.postgresql) {
      return false;
    }

    return TIME_METRICS.includes(metric.metricName);
  });
  let currentPercent = PERCENT_COUNT;

  const normalizedTimeMetrics = timeMetrics
    .map(metric => {
      const {
        name,
        metricName,
        metric: { sum },
      } = metric;

      const percentage = sum / (totalValue / PERCENT_COUNT);
      const value = Math.max(percentage, 1);
      currentPercent -= percentage;
      return {
        name: name,
        value: value,
        description: Humanize.transform(percentage / PERCENT_COUNT, 'percent'),
        color: METRICS_COLORS[metricName],
      };
    })
    .sort((a, b) => b.value - a.value);

  if (currentPercent < PERCENT_COUNT || timeMetrics.length === 0) {
    normalizedTimeMetrics.push({
      name: 'Other',
      value: currentPercent,
      description: Humanize.transform(currentPercent / PERCENT_COUNT, 'percent'),
      color: 'gray',
    });
  }

  return (
    <>
      <h4>Query time distribution</h4>
      <HSBar height={30} showTextIn id="query-time-chart" fontColor="white" data={normalizedTimeMetrics} />
    </>
  );
};

export default TimeDistributionChart;