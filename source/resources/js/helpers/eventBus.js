import { ref, watch } from 'vue';

const bus = ref(new Map());
const run = ref(new Map());
const options = {
    timeout: 300,
    sleep: 100
}

export function useEventsBus() {
    const emit = async (event, props = null) => {
        return new Promise((resolve) => {
            const currentValue = bus.value.get(event);
            const counter = currentValue ? ++currentValue[1] : 1;
            const currentRunValue = run.value.get(event);
            if (currentRunValue) {
                run.value.set(event, [currentRunValue[0], 0]);
            }
            bus.value.set(event, [props, counter]);

            let timeout = options.timeout

            const checkInterval = setInterval(() => {
                const currentRunValue = run.value.get(event);
                timeout -= options.sleep
                if (timeout <= 0 || !currentRunValue || currentRunValue[0] == currentRunValue[1]) {
                    clearInterval(checkInterval);
                    resolve(true);
                }
            }, options.sleep);
        });
    };

    const on = (event, callback) => {
        const currentValue = run.value.get(event);
        const counter = currentValue ? ++currentValue[0] : 1;
        run.value.set(event, [counter, 0]);
        watch(() => bus.value.get(event), (val) => {
            callback(val[0]);
            const currentRunValue = run.value.get(event);
            run.value.set(event, [currentRunValue[0], ++currentRunValue[1]]);
        });
    };

    return {
        emit,
        on,
        bus,
    };
}