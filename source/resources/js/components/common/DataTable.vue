<template>
    <data-table
        :rows="listCamera"
        :loading="isLoading"
        @loadData="initCamera"
        striped
    >
        <template #thead>
            <table-head-cell>
                Name
            </table-head-cell>

            <table-head-cell>
                Surname
            </table-head-cell>
        </template>

        <template #loading>
            <div class="">Loading....</div>
        </template>

        <template #empty>
            <table-body-cell colspan="2">
                No record found.
            </table-body-cell>
        </template>
    </data-table>
</template>

<script>
import { computed, ref, onMounted, watchEffect } from 'vue';
import {
    DataTable,
    TableBodyCell,
    TableHeadCell
} from "@jobinsjp/vue3-datatable"

export default {
    name: "Datatable",
    components: {
        DataTable,
        TableBodyCell,
        TableHeadCell
    },
    props: {
        headers: {
            type: Array,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        loadData: {
            type: Function
        }
    }
}
</script>