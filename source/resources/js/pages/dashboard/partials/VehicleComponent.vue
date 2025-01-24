<template>
    <div>
        <portlet :title="'Đo đếm lưu lượng'">
            <div slot="tool" class="text-primary"><h2>32987</h2></div>
            <div>
                <div class="row">
                    <div class="col-md-1">
                        <i class="la la-motorcycle" style="font-size: 45px"></i>
                    </div>
                    <div class="col-md-5" style="font-size: 33px">Xe máy</div>
                    <div class="col-md-4 text-info" style="font-size: 33px">
                        12987
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <i class="la la-car" style="font-size: 45px"></i>
                    </div>
                    <div class="col-md-5" style="font-size: 33px">Ô tô con</div>
                    <div class="col-md-4 text-info" style="font-size: 33px">
                        9568
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <i class="la la-truck" style="font-size: 45px"></i>
                    </div>
                    <div class="col-md-5" style="font-size: 33px">Xe tải</div>
                    <div class="col-md-4 text-info" style="font-size: 33px">
                        9875
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <i class="la la-train" style="font-size: 45px"></i>
                    </div>
                    <div class="col-md-5" style="font-size: 33px">Xe khách</div>
                    <div class="col-md-4 text-info" style="font-size: 33px">
                        34
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <i class="la la-bicycle" style="font-size: 45px"></i>
                    </div>
                    <div class="col-md-5" style="font-size: 33px">Xe đạp</div>
                    <div class="col-md-4 text-info" style="font-size: 33px">
                        10
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1">
                        <i class="la la-female" style="font-size: 45px"></i>
                    </div>
                    <div class="col-md-5" style="font-size: 33px">
                        Người đi bộ
                    </div>
                    <div class="col-md-4 text-info" style="font-size: 33px">
                        97
                    </div>
                </div>
            </div>
            <div style="margin-top: 5px">
                <h5><b>Diễn biến lưu lượng</b></h5>
                <another-highcharts
                    :point-width="20"
                    :series="lineSeries"
                    :tooltip-format="'{series.name}: <b>{point.y:,.0f}</b>'"
                    :chart-type="'line'"
                    :chart-height="400"
                    :plot-options="linePlotOption"
                    :has-legend="true"
                    :compare-series="false"
                    :colors="['#34bfa3']"
                    :categories="categories"
                >
                </another-highcharts>
            </div>
        </portlet>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "VehicleComponent",
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
                    name: "Lưu lượng",
                    data: [
                        43934,
                        52503,
                        57177,
                        69658,
                        97031,
                        119931,
                        137133,
                        154175
                    ],
                    type: "line"
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
    },
    watch: {
        timeFilter(data) {
            console.log(data);
            this.getDataVehicle(data);
        }
    },
    methods: {
        async getDataVehicle(value) {
            try {
                let res = await axios.post("/dashboard/count-vehicle", {
                    time: value
                });
                const { data } = res;
            } catch (e) {
                console.log(e);
            }
        }
    }
};
</script>
