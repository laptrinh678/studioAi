<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <the-date-range
                    v-model="timeFilter"
                    :name-shortcut="['last_7_days', 'last_30_days']"
                    :shortcut="true"
                    :default-time="[Date(), '23:59:59']"
                ></the-date-range>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6">
                        <vehicle-component
                            :time-filter="timeFilter"
                        ></vehicle-component>
                    </div>
                    <div class="col-md-6">
                        <break-component
                            :time-filter="timeFilter"
                        ></break-component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheDateRange from "~/components/common/TheDateRange";
import VehicleComponent from "./partials/VehicleComponent";
import BreakComponent from "./partials/BreakComponent";
export default {
    name: "DashBoard",
    components: { BreakComponent, VehicleComponent, TheDateRange },
    data() {
        return {
            timeFilter: null
        };
    },
    watch: {
        timeFilter(data) {
            console.log(data);
        }
    }
};
</script>
