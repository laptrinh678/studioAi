<template>
    <div>
        <dashboard></dashboard>
    </div>
</template>

<script>
import Dashboard from "~/pages/dashboard/Dashboard";
export default {
    middleware: "auth",
    components: { Dashboard }
};
</script>
