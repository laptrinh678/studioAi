import { getCurrentInstance } from "vue";

const useModal = () => {
  return getCurrentInstance().appContext.config.globalProperties.$modal;
};
export { useModal };
