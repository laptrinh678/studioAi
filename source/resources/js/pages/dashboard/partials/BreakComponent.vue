<template>
    <div>
        <portlet :title="'Giám sát vi phạm'">
            <div slot="tool" class="text-danger"><h2>32987</h2></div>
            <div>
                <div class="row">
                    <div class="col-md-1">
                        <i
                            class="la la-flag-checkered"
                            style="font-size: 45px"
                        ></i>
                    </div>
                    <div class="col-md-5" style="font-size: 33px">
                        Vượt đèn đỏ
                    </div>
                    <div class="col-md-4 text-info" style="font-size: 33px">
                        12987
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-1">
                        <i
                            class="la la-align-center"
                            style="font-size: 45px"
                        ></i>
                    </div>
                    <div class="col-md-5" style="font-size: 33px">
                        Sai làn
                    </div>
                    <div class="col-md-4 text-info" style="font-size: 33px">
                        9568
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-1">
                        <i
                            class="la la-minus-circle"
                            style="font-size: 45px"
                        ></i>
                    </div>
                    <div class="col-md-5" style="font-size: 33px">
                        Ngược chiều
                    </div>
                    <div class="col-md-4 text-info" style="font-size: 33px">
                        9875
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-1">
                        <i
                            class="la la-times-circle"
                            style="font-size: 45px"
                        ></i>
                    </div>
                    <div class="col-md-5" style="font-size: 33px">
                        Dừng đỗ trái phép
                    </div>
                    <div class="col-md-4 text-info" style="font-size: 33px">
                        34
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-1">
                        <i class="la la-subway" style="font-size: 45px"></i>
                    </div>
                    <div class="col-md-5" style="font-size: 33px">
                        Vượt sai quy định
                    </div>
                    <div class="col-md-4 text-info" style="font-size: 33px">
                        97
                    </div>
                </div>
            </div>

            <div style="margin-top: 54px">
                <h5><b>Diễn biến vi phạm</b></h5>
                <another-highcharts
                    :point-width="20"
                    :series="lineSeries"
                    :tooltip-format="'{series.name}: <b>{point.y:,.0f}</b>'"
                    :chart-type="'line'"
                    :chart-height="400"
                    :plot-options="linePlotOption"
                    :has-legend="true"
                    :compare-series="false"
                    :colors="[
                        '#34bfa3',
                        '#f4516c',
                        '#5867dd',
                        '#ffb822',
                        '#0d233a'
                    ]"
                    :categories="categories"
                >
                </another-highcharts>
            </div>
        </portlet>
    </div>
</template>

<script>
export default {
    name: "BreakComponent",
    props: {
        timeFilter: {
            default: null
        }
    },
    data() {
        return {
            //Highchart
            lineSeries: [
                {
                    name: "Vượt đèn đỏ",
                    data: [434, 503, 57177, 58, 931, 9931, 133, 1175]
                },
                {
                    name: "Sai làn",
                    data: [4334, 5503, 5777, 6958, 731, 19931, 1133, 54175]
                },
                {
                    name: "Ngược chiều",
                    data: [4334, 5203, 5717, 6958, 971, 119931, 133, 175]
                },
                {
                    name: "Dừng đỗ trái phép",
                    data: [4934, 525, 57177, 6958, 903, 1931, 137133, 15475]
                },
                {
                    name: "Vượt sai quy định",
                    data: [43934, 5203, 5177, 6958, 701, 1191, 13133, 15175]
                }
            ],
            linePlotOption: {
                line: {
                    dataLabels: {
                        enabled: false
                    }
                },
                column: {
                    dataLabels: {
                        enabled: true,
                        format: "{point.y:,.0f} "
                    },
                    minPointLength: 3
                },
                enableMouseTracking: false
            },
            categories: [
                "15/03",
                "16/03",
                "17/03",
                "18/03",
                "19/03",
                "20/03",
                "21/03",
                "22/03"
            ]
        };
    }
};
</script>
