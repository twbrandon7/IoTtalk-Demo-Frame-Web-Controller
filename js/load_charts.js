var ChartToolKit = {
    addData: function (chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    },
    removeData: function (chart) {
        chart.data.labels.splice(0, 1);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.splice(0, 1);
        });
        chart.update();
    },
    shiftData: function (chart) {
        chart.data.labels.shift();
        chart.data.datasets.forEach(dataset => {
            dataset.data[0] = dataset.data[1]
            dataset.data.splice(1, 1)
        });
    },
    basicLineChart: function (ctx, label, backgroundColor, borderColor, labels, datas) {
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    lineTension: 0,
                    label: label,
                    data: datas,
                    backgroundColor: [
                        backgroundColor,
                    ],
                    borderColor: [
                        borderColor,
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'second',
                            displayFormats: {
                                quarter: 'h:mm:ss'
                            }
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

var CustomChartLoader = {
    loadTemperatureChart: function (canvasId, labels = [], datas = []) {
        var ctx = $("#" + canvasId);
        var myChart = ChartToolKit.basicLineChart(ctx, '氣溫', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)', labels, datas);
        return myChart;
    },
    loadHumidityChart: function (canvasId, labels = [], datas = []) {
        var ctx = $("#" + canvasId);
        var myChart = ChartToolKit.basicLineChart(ctx, '濕度', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 1)', labels, datas);
        return myChart;
    },
    loadAtmosphericPressureChart: function (canvasId, labels = [], datas = []) {
        var ctx = $("#" + canvasId);
        var myChart = ChartToolKit.basicLineChart(ctx, '大氣壓', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 1)', labels, datas);
        return myChart;
    },
    loadAltitudeChart: function (canvasId, labels = [], datas = []) {
        var ctx = $("#" + canvasId);
        var myChart = ChartToolKit.basicLineChart(ctx, '高度', 'rgba(153, 102, 255, 0.2)', 'rgba(153, 102, 255, 1)', labels, datas);
        return myChart;
    },
    loadLightSensorChart: function (canvasId, labels = [], datas = []) {
        var ctx = $("#" + canvasId);
        var myChart = ChartToolKit.basicLineChart(ctx, '光感測器數值', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 159, 64, 1)', labels, datas);
        return myChart;
    },
    loadMoistureChart: function (canvasId, labels = [], datas = []) {
        var ctx = $("#" + canvasId);
        var myChart = ChartToolKit.basicLineChart(ctx, '土壤濕度', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 1)', labels, datas);
        return myChart;
    }
};