<template>
    <portlet :title="`Chi tiết camera ${camera.name_cam}`">
        <template #head>
            <el-icon size="20" class="gray--text mr-3" style="cursor: pointer" @click="backToDashboard"><Back /></el-icon>
        </template>
        <template #tool>
            <el-date-picker
                v-model="dateRange"
                type="datetimerange"
                range-separator="-"
                start-placeholder="Từ ngày"
                end-placeholder="Đến ngày"
                :shortcuts="shortcuts"
                format="DD/MM/YYYY HH:mm"
                value-format="DD-MM-YYYY HH:mm"
                @calendar-change="calendarChange"
                :disabled-date="disabledDate"
            />

            <el-radio-group v-model="typeChoosen" class="chooseType pl-6">
                <el-radio-button label="Lưu lượng">
                    <el-icon class="is-loading mr-3" v-show="isLoadingTrafficLog">
                        <Loading />
                    </el-icon>
                    Lưu lượng
                </el-radio-button>
                <el-radio-button label="Vi phạm">
                    <el-icon class="is-loading mr-3" v-show="isLoadingViolationLog">
                        <Loading />
                    </el-icon>
                    Vi phạm
                </el-radio-button>
            </el-radio-group>
        </template>

        <el-row :gutter="5" class="detailVideo mt-4">
            <el-col :xs="24" :lg="17" :xl="16" class="stream">
                <div class="dark_lighten_2--bg h-100" style="border-radius: 20px">
                    <play-video onlyVideo v-if="camera && camera.id_cam" :camera="camera" />
                </div>
            </el-col>
            <el-col :xs="24" :lg="7" :xl="8">
                <div class="dark_lighten_2--bg chart">
                    <another-highcharts
                        v-if="hasValue(arrTotalChart[0])"
                        chart-type="area"
                        :series="arrTotalChart[0].series"
                        :colors="arrTotalChart[0].color"
                        :categories="arrTotalChart[0].categories"
                        :tooltip-format="tooltipFormat"
                        :point-width="20"
                        :chart-height="400"
                        :has-legend="true"
                        :compare-series="false"
                    />

                    <div v-for="(chart, key) in arrChart" style="width: 100%">
                        <another-highcharts
                            v-if="hasValue(chart.series[0].data)"
                            chart-type="line"
                            :series="chart.series"
                            :colors="chart.color"
                            :categories="chart.categories"
                            :point-width="20"
                            :chart-height="400"
                            :has-legend="true"
                            :compare-series="false"
                        />
                    </div>
                </div>
            </el-col>
        </el-row>
    </portlet>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';
import PlayVideo from '~/components/elements/PlayVideo'
import ViolationService from '~/services/ViolationService'
import moment from 'moment'

const formatDate = 'DD-MM-YYYY HH:mm'

export default {
    layout: "default",
    components: { PlayVideo },
    props: {
        otherProp: {
            type: Object
        }
    },
    setup(props) {
        const router = useRouter();

        const typeChoosen = ref('Vi phạm')
        const route = useRoute()

        const tooltipFormat = ref({
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: `
                <tr>
                    <td style="color:{series.color}">Tổng số: </td>
                    <td><b>{point.y:,.0f}</b></td>
                </tr>
            `,
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        })

        const disabledDate = (date) => {
            return date > new Date()
        }

        const dateRange = ref([
            // moment().subtract(6, "day").startOf('day').format(formatDate),
            // moment().subtract(4, "day").endOf('day').format(formatDate)
            moment().startOf('day').format(formatDate),
            moment().endOf('day').format(formatDate)
        ])

        const shortcuts = [
            {
                text: 'Tuần trước',
                    value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                    return [start, end]
                },
            },
            {
                text: 'Tháng trước',
                value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                    return [start, end]
                },
            }
        ]

        const arrChart = ref([])
        const arrTotalChart = ref([])
        const camera = ref({})

        onMounted(() => {
            camera.value = {
                name_cam: route.params.cam_name,
                id_cam: route.params.cam_id,
                hls_url: route.params.hls_url
            }
            getTotalViolationLog()
            getViolationLog()
        });

        watch(() => dateRange.value, (newValue, oldValue) => {
            if (newValue) {
                if (typeChoosen.value == 'Lưu lượng') {
                    getTotalTrafficLog()
                    getTrafficLog()
                } else {
                    getTotalViolationLog()
                    getViolationLog()
                }
            }
        })

        watch(() => typeChoosen.value, (newValue, oldValue) => {
            if (newValue == 'Lưu lượng') {
                getTotalTrafficLog()
                getTrafficLog()
            } else {
                getTotalViolationLog()
                getViolationLog()
            }
        })

        const isLoadingViolationLog = ref(false)
        const isLoadingTrafficLog = ref(false)

        const getTotalViolationLog = async () => {
            let seriesData = [{ name: "Tổng quát", data: [] }]
            let categoriesData = []

            await ViolationService.getTotalViolationLog({
                id_cam: route.params.cam_id,
                violation: route.params.violation_slug,
                datePicked: dateRange.value,
            }).then(response => {
                seriesData[0].data = response.data.count
                categoriesData = response.data.date
            })

            arrTotalChart.value = [
                {
                    series: seriesData,
                    categories: categoriesData,
                    color: ['#409eff']
                }
            ]
        }

        const getTotalTrafficLog = async () => {
            let seriesData = [{ name: "Tổng quát", data: [] }]
            let categoriesData = []

            await ViolationService.getTotalTrafficLog({
                id_cam: route.params.cam_id,
                violation: route.params.violation_slug,
                datePicked: dateRange.value,
            }).then(response => {
                seriesData[0].data = response.data.count
                categoriesData = response.data.date
            })

            arrTotalChart.value = [
                {
                    series: seriesData,
                    categories: categoriesData,
                    color: ['#409eff']
                }
            ]
        }

        const getViolationLog = async () => {
            isLoadingViolationLog.value = true

            let seriesRedLight = [{ name: "Vưọt đèn đỏ", data: [] }]
            let seriesYellowLight = [{ name: "Vượt đèn vàng", data: [] }]
            let seriesWrongWay = [{ name: 'Đi ngược chiều', data: [] }]
            let seriesWrongLane = [{ name: 'Sai làn', data: [] }]
            let seriesNoParking = [{ name: 'Cấm dừng', data: [] }]
            let seriesCrosswalk = [{ name: 'Đè vạch', data: [] }]

            let categoriesRedLight = []
            let categoriesYellowLight = []
            let categoriesWrongWay = []
            let categoriesWrongLane = []
            let categoriesNoParking = []
            let categoriesCrosswalk = []

            await ViolationService.getViolationLog({
                id_cam: route.params.cam_id,
                violation: route.params.violation_slug,
                datePicked: dateRange.value,
            }).then(response => {
                isLoadingViolationLog.value = false

                route.params.violation_slug.forEach((value, key) => {
                    switch (value) {
                        case "VuotDenDo":
                            seriesRedLight[0].data = response.data.count.VuotDenDo
                            categoriesRedLight = response.data.date.VuotDenDo
                            break;
                        case "VuotDenVang":
                            seriesYellowLight[0].data = response.data.count.VuotDenVang
                            categoriesYellowLight = response.data.date.VuotDenVang
                            break;
                        case "DiNguocChieu":
                            seriesWrongWay[0].data = response.data.count.DiNguocChieu
                            categoriesWrongWay = response.data.date.DiNguocChieu
                            break;
                        case "SaiLan":
                            seriesWrongLane[0].data = response.data.count.SaiLan
                            categoriesWrongLane = response.data.date.SaiLan
                            break;
                        case "CamDung":
                            seriesNoParking[0].data = response.data.count.CamDung
                            categoriesNoParking = response.data.date.CamDung
                            break;
                        case "DeVach":
                            seriesCrosswalk[0].data = response.data.count.DeVach
                            categoriesCrosswalk = response.data.date.DeVach
                            break;
                    }
                })
            })

            arrChart.value = [
                {
                    series: seriesRedLight,
                    categories: categoriesRedLight,
                    color: ['#FF7171']
                },
                {
                    series: seriesYellowLight,
                    categories: categoriesYellowLight,
                    color: ['#F2994A']
                },
                {
                    series: seriesWrongWay,
                    categories: categoriesWrongWay,
                    color: ['#6FCF97']
                },
                {
                    series: seriesWrongLane,
                    categories: categoriesWrongLane,
                    color: ['#34bfa3']
                },
                {
                    series: seriesNoParking,
                    categories: categoriesNoParking,
                    color: ['#409eff']
                },
                {
                    series: seriesCrosswalk,
                    categories: categoriesCrosswalk,
                    color: ['#F2994A']
                }
            ]
        }

        const getTrafficLog = async () => {
            isLoadingTrafficLog.value = true

            let lineSeriesCar = [{ name: "Ô tô", data: [] }]
            let lineSeriesTruck = [{ name: "Xe tải", data: [] }]
            let lineSeriesVan = [{ name: "Xe khách", data: [] }]
            let lineSeriesBike = [{ name: "Xe máy", data: [] }]
            let lineSeriesBicycle = [{ name: "Xe đạp", data: [] }]

            let categoriesCar = []
            let categoriesTruck = []
            let categoriesVan = []
            let categoriesBike = []
            let categoriesBicycle = []

            await ViolationService.getTrafficLog({
                id_cam: route.params.cam_id,
                violation: route.params.violation_slug,
                datePicked: dateRange.value,
            }).then(response => {
                isLoadingTrafficLog.value = false

                lineSeriesCar[0].data = response.data.count.car
                lineSeriesTruck[0].data = response.data.count.truck
                lineSeriesVan[0].data = response.data.count.van
                lineSeriesBike[0].data = response.data.count.bike
                lineSeriesBicycle[0].data = response.data.count.bicycle

                categoriesCar = response.data.date.car
                categoriesTruck = response.data.date.truck
                categoriesVan = response.data.date.van
                categoriesBike = response.data.date.bike
                categoriesBicycle = response.data.date.bicycle
            })

            arrChart.value = [
                {
                    series: lineSeriesCar,
                    categories: categoriesCar,
                    color: ['#FF7171']
                },
                {
                    series: lineSeriesTruck,
                    categories: categoriesTruck,
                    color: ['#F2994A']
                },
                {
                    series: lineSeriesVan,
                    categories: categoriesVan,
                    color: ['#6FCF97']
                },
                {
                    series: lineSeriesBike,
                    categories: categoriesBike,
                    color: ['#34bfa3']
                },
                {
                    series: lineSeriesBicycle,
                    categories: categoriesBicycle,
                    color: ['#67c23a']
                }
            ]
        }

        const calendarChange = (value) => {
            if (Math.abs(value[0] - value[1]) == 0) {
                value[1] = moment(value[1]).endOf('day').toDate()
            }
        }

        const hasValue = (obj) => {
            let value = false

            if (obj) {
                value = Object.keys(obj).length > 0
            }

            return value
        }

        const backToDashboard = () => {
            router.push({
                name: 'dashboard',
                params: {
                    currentPage: route.params.currentPage,
                    perPage: route.params.perPage
                },
            });
        }

        return {
            disabledDate,
            typeChoosen,
            dateRange,
            shortcuts,
            tooltipFormat,
            camera,
            arrChart,
            arrTotalChart,
            calendarChange,
            hasValue,
            backToDashboard,
            isLoadingViolationLog,
            isLoadingTrafficLog
        }
    },
    data() {
        return {
            time: null,
            minute: null,
            hour: null,
            //Highchart
        };
    },
    watch: {
        hour(data) {
            console.log('watch hour');
            this.getDataHighchart(data, this.minute);
        },
        minute(data) {
            console.log('watch minute');
            this.getDataHighchart(this.hour, data);
        }
    },
    mounted() {
        // this.testAuto();
    },
    methods: {
        getDataHighchart(hour, minute) {
            console.log(hour + "-" + minute);
        },
        testAuto() {
            setInterval(() => {
                this.reloadElement();
                console.log("Da reload ss");
            }, 1000);
        },
        reloadElement() {
            let imgName =
                "/storage/data/fix_traffic_1/demo.jpg?" + performance.now();
            let imageObject = document.getElementById("img_demo");
            // imageObject.src = imgName;
        }
    }
};
</script>

<style lang="scss">
@import "@/sass/variables";

.responsive {
    width: 100%;
    height: 100%;
}

.chooseType {
    .el-radio-button__inner {
        display: flex;
        align-items: center;
    }

    span {
        border-color: $white !important;

        &:hover {
            color: inherit !important;
        }
    }

    .is-active span {
        background-color: $red !important;
        border-color: $red !important;
        box-shadow: unset !important;
    }
}

.detailVideo {
    max-height: 100vh;

    .stream {
        height: calc(100vh - 220px)
    }

    .chart {
        height: calc(100vh - 220px);
        overflow-y: auto;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;

        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #aaa;
        }

        text {
            fill: $gray_darken !important;
        }
    }
}

</style>
