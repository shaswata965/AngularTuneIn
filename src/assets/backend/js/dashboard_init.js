!(function (a) {
    "use strict";
    a(function () {
        if (a("#bar").length) {
            var e = a("#bar").get(0).getContext("2d");
            e.height =20;
            new Chart(e, {
                type: "bar",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            label: "Revenue",
                            backgroundColor: "#1ccab8",
                            borderColor: "transparent",
                            borderWidth: 2,
                            categoryPercentage: 0.5,
                            hoverBackgroundColor: "#00d8c2",
                            hoverBorderColor: "transparent",
                            data: [30, 39, 20, 31, 41, 25, 20, 39, 20, 31, 41, 25],
                        },
                    ],
                },
                options: {
                    // responsive: !0,
                    responsive: true,
                    // maintainAspectRatio: !0,
                    maintainAspectRatio: false,
                    legend: { display: !1, labels: { fontColor: "#50649c" } },
                    tooltips: {
                        enabled: !0,
                        callbacks: {
                            label: function (e, a) {
                                return a.datasets[e.datasetIndex].label + " $ " + e.yLabel + "k";
                            },
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                barPercentage: 0.35,
                                categoryPercentage: 0.4,
                                display: !0,
                                gridLines: { color: "transparent", borderDash: [0], zeroLineColor: "transparent", zeroLineBorderDash: [2], zeroLineBorderDashOffset: [2] },
                                ticks: { fontColor: "#a4abc5", beginAtZero: !0, padding: 12 },
                            },
                        ],
                        yAxes: [
                            {
                                gridLines: { color: "#8997bd29", borderDash: [3], drawBorder: !1, drawTicks: !1, zeroLineColor: "#8997bd29", zeroLineBorderDash: [2], zeroLineBorderDashOffset: [2] },
                                ticks: {
                                    fontColor: "#a4abc5",
                                    beginAtZero: !0,
                                    padding: 12,
                                    callback: function (e) {
                                        if (!(e % 10)) return "$" + e + "k";
                                    },
                                },
                            },
                        ],
                    },
                },
            });
        }
    });
})(jQuery)


// echart
jQuery(function (e) {
    "use strict";
    var o = window.AdminoxAdmin || {};
    if (e("#platform_type_dates_donut").length) {
        echarts.init(document.getElementById("platform_type_dates_donut")).setOption({
            timeline: {
                show: !1,
                data: ["06-16", "05-16", "04-16"],
                label: {
                    formatter: function (e) {
                        return e ? e.slice(0, 5) : null;
                    },
                },
                x: 10,
                y: null,
                x2: 10,
                y2: 0,
                width: 10,
                height: 50,
                backgroundColor: "rgba(0,0,0)",
                borderColor: "#eaeaea",
                borderWidth: 0,
                padding: 5,
                controlPosition: "left",
                autoPlay: !0,
                loop: !1,
                playInterval: 2e3,
                lineStyle: { width: 1, color: "#000", type: "" },
            },
            options: [
                {
                    color: ["#14256A", "#64c5b1", "#414b4f", "#ee4b82", "#45bbe0"],
                    title: { text: "", subtext: "" },
                    tooltip: { trigger: "item", formatter: "{a} <br/>{b} : {c} ({d}%)" },
                    legend: { show: !1, x: "left", orient: "vertical", padding: 0, data: ["iPhone 7", "Windows", "Desktop", "Mobiles", "Others"] },
                    toolbox: {
                        show: !0,
                        color: ["#bdbdbd", "#bdbdbd", "#bdbdbd", "#bdbdbd"],
                        feature: {
                            mark: { show: !1 },
                            dataView: { show: !1, readOnly: !0 },
                            magicType: { show: !0, type: ["pie", "funnel"], option: { funnel: { x: "10%", width: "80%", funnelAlign: "center", max: 50 }, pie: { roseType: "none" } } },
                            restore: { show: !1 },
                            saveAsImage: { show: 0 },
                        },
                    },
                    series: [
                        {
                            name: "06-16",
                            type: "pie",
                            radius: [20, "80%"],
                            roseType: "none",
                            center: ["50%", "45%"],
                            width: "40%",
                            itemStyle: { normal: { label: { show: !1 }, labelLine: { show: !0 } }, emphasis: { label: { show: !1 }, labelLine: { show: !1 } } },
                            data: [
                                { value: 35, name: "iPhone 7" },
                                { value: 16, name: "Windows" },
                                { value: 27, name: "Desktop" },
                                { value: 29, name: "Mobiles" },
                                { value: 12, name: "Others" },
                            ],
                        },
                    ],
                },
                {
                    series: [
                        {
                            name: "05-16",
                            type: "pie",
                            data: [
                                { value: 42, name: "iPhone 7" },
                                { value: 51, name: "Windows" },
                                { value: 39, name: "Desktop" },
                                { value: 25, name: "Mobiles" },
                                { value: 9, name: "Others" },
                            ],
                        },
                    ],
                },
                {
                    series: [
                        {
                            name: "04-16",
                            type: "pie",
                            data: [
                                { value: 29, name: "iPhone 7" },
                                { value: 16, name: "Windows" },
                                { value: 24, name: "Desktop" },
                                { value: 19, name: "Mobiles" },
                                { value: 5, name: "Others" },
                            ],
                        },
                    ],
                },
            ],
        });
    }
    e(window).on("load", function () {});
})

// chart js

//# sourceMappingURL=dashboard.js.map
