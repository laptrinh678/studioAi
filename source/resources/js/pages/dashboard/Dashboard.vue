<template>
    <portlet :show-head="false">
        <el-select
            v-model="perPage"
            placeholder="Activity zone"
            class="select_per_page"
        >
            <el-option
                v-for="(page, index) in pages"
                :key="`per_page_${index}`"
                :label="page"
                :value="page"
            />
        </el-select>

        <div class="d-flex justify-content-between mt-20 mb-20">
            <el-button
                round
                @click="changePage(false)"
                :disabled="currentPage == 1"
                class="btn-custom paginate dark_lighten_2--bg dark_lighten_2--hover dark_lighten_2--border gray--text"
            >
                <img :src="iconArrowLeft" alt="icon_arrow_left" width="22" class="gray_lighten pr-3"/>
                Trang trước
            </el-button>

            <el-button
                round
                @click="changePage()"
                :disabled="currentPage == totalPage"
                class="btn-custom paginate dark_lighten_2--bg dark_lighten_2--hover dark_lighten_2--border gray--text"
            >
                Trang sau
                <img :src="iconArrowRight" alt="icon_arrow_right" width="22" class="gray_lighten pl-3"/>
            </el-button>
        </div>

        <!-- <div class="d-flex" style="justify-content: center">
            <el-pagination
                v-if="perPage < totalData"
                v-model:page-size="perPage"
                v-model:current-page="currentPage"
                :total="totalData"
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
            />
        </div> -->
    </portlet>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import IconArrowLeft from '~assets/icon/arrow_left.png'
import IconArrowRight from '~assets/icon/arrow_right.png'

export default {
    name: "Dashboard",
    middleware: "auth",
    components: { },
    setup () {
        const route = useRoute()

        const pages = ref([4, 8, 12, 16, 32])
        const currentPage = ref(1)
        const perPage = ref(4)
        const listData = ref([])
        const totalData = ref(0)
        const totalPage = ref(0)

        onMounted(() => {
            initCamera()
        })

        const initCamera = () => {
            if (route.params.currentPage) {
                currentPage.value = parseInt(route.params.currentPage)
                perPage.value = parseInt(route.params.perPage)
            }

            // CameraService.list({
            //     page: currentPage.value,
            //     per_page: perPage.value,
            //     keyword: ""
            // }).then(response => {
            //     listData.value = response.data.data
            //     totalData.value = response.data.total
            //     totalPage.value = response.data.last_page
            // })
        }

        watch(perPage, (value) => {
            currentPage.value = 1
            initCamera()
        });

        const changePage = (isNextPage = true) => {
            if (isNextPage) {
                currentPage.value += 1
            } else {
                currentPage.value -= 1
            }

            if (route.params) {
                route.params.currentPage = undefined
            }

            initCamera()
        }

        const iconArrowLeft = IconArrowLeft;
        const iconArrowRight = IconArrowRight;

        return {
            iconArrowLeft,
            iconArrowRight,
            changePage,
            pages,
            currentPage,
            perPage,
            listData,
            totalData,
            totalPage,
            initCamera
        }
    },
    data() {
        return {

        };
    }
};
</script>

<style lang="scss">
.select_per_page {
    width: 70px !important;
    input {
        padding-left: 0 !important;
    }
}
</style>
