<template>
    <div id="sidebar" class="d-flex flex-column flex-shrink-0 sidebar">
        <ul class="nav nav-pills flex-column mb-auto menu-list-sidebar">
            <li class="nav-item" v-for="(menu, index) in menus" :key="'menu-' + index">
                <template v-if="!menu.children && checkPermission(menu)">
                    <a
                        @click="goTo(menu.router)"
                        class="nav-link"
                        :class="{ 'active': checkIsActiveRootMenu(menu.adminMenu, activeSidebar) }"
                    >
                        <img
                            :src="menu.icon"
                            alt="icon_arrow_left"
                            width="20"
                            class="icon-sidebar-open"
                            :class="checkIsActiveRootMenu(menu.adminMenu, activeSidebar) ? 'red' : 'gray'"
                        />

                        <span class="label pl-3">{{ menu.title }}</span>
                    </a>
                </template>
                <template v-if="menu.children && checkPermission(menu)">
                    <a
                        class="nav-link"
                        data-bs-toggle="collapse"
                        :href="'#children_list' + index"
                        :aria-controls="'children_list' + index"
                        role="button"
                        aria-expanded="false"
                    >
                        <img
                            :src="menu.icon"
                            alt="icon_arrow_left"
                            width="20"
                            class="icon-sidebar-open"
                            :class="checkIsActive(menu.adminMenu, activeSidebar) ? 'red' : 'gray'"
                        />

                        <span class="nav-link-label pl-3" :class="{'red--text': checkIsActive(menu.adminMenu, activeSidebar)}">
                            {{ menu.title }}
                        </span>
                    </a>
                    <ul class="collapse" :id="'children_list' + index">
                        <li v-for="(item, index) in menu.children" :key="'children-' + index" class="children-item">
                            <template v-if="checkPermission(item)">
                                <a
                                    @click="goTo(item.router)"
                                    class="nav-link"
                                    :class="{'active': item.adminMenu === activeSidebar}"
                                >
                                    <el-icon
                                        size="20"
                                        :class="item.adminMenu === activeSidebar ? 'red--text' : 'd-none'"
                                    >
                                            <Right />
                                    </el-icon>
                                    <span class="label">{{ item.title }}</span>
                                </a>
                            </template>
                        </li>
                    </ul>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
import { includes } from 'lodash'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ACTION_LOGOUT } from '~/store/auth/actions'
import { deleteSearchParams, deleteActivePage } from '~/helpers/localStorage';
import { ACTION_CLEAR_SEARCH_PARAMS } from '~/store/common/actions'
import IconScan from '@/assets/icon/scan.png'
import IconWebcam from '@/assets/icon/webcam.png'
import IconSetting from '@/assets/icon/setting.png'

export default {
    setup(props, {emit}) {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        const isAdmin = computed(() => store.getters["isAdmin"]);

        const goTo = (link) => {
            store.dispatch(ACTION_CLEAR_SEARCH_PARAMS, '')
            deleteSearchParams();
            deleteActivePage();
            if (route.name === link.name) {
                emit('refresh', route.name);
            } else {
                router.push({
                    name: link.name,
                });
            }
        };
        const logout = async () => {
            await store.dispatch(ACTION_LOGOUT);
            deleteSearchParams();
            deleteActivePage();
            await router.push({
                name: "Login",
            });
        }
        const checkPermission = (menu) => {
            if (isAdmin.value) {
                return true
            }

            if (menu.children) {
                for (let i = 0; i < menu.children.length; i ++) {
                    if (!menu.children[i].onlyAdmin) {
                        return true
                    }
                }

                return false
            }

            if (!menu.onlyAdmin) {
                return true
            }
        }

        const activeSidebar = computed(() => store.getters["activeSidebar"]);

        const checkIsActive = (listChildMenu, activeSidebar) => {
            return includes(listChildMenu, activeSidebar)
        }

        const checkIsActiveRootMenu = (menu, activeSidebar) => {
            if (menu == 'dashboard' && activeSidebar == 'detail-camera') {
                return true
            }

            return menu == activeSidebar
        }

        const iconScan = IconScan
        const iconWebcam = IconWebcam
        const iconSetting = IconSetting

        const menus = [
            {
                title: 'Tổng quan',
                icon: iconScan,
                router: { name: 'dashboard' },
                adminMenu: 'dashboard',
                onlyAdmin: false
            },
            {
                title: 'Giám sát camera',
                icon: iconWebcam,
                router: { name: 'camera-monitor' },
                adminMenu: 'camera-monitor',
                onlyAdmin: false
            },
            {
                title: 'Theo dõi log camera',
                icon: iconWebcam,
                router: { name: 'camera-monitor-log' },
                adminMenu: 'camera-monitor-log',
                onlyAdmin: false
            },
            // {
            //     title: 'Giám sát vi phạm',
            //     children: [
            //         {
            //             title: 'Khu vực 1',
            //             router: { name: 'KV1' },
            //             adminMenu: 'KV1',
            //             onlyAdmin: false
            //         },
            //         {
            //             title: 'Vũng Tàu',
            //             router: { name: 'VungTau' },
            //             adminMenu: 'VungTau',
            //             onlyAdmin: false
            //         },
            //     ],
            // },
            {
                title: 'Cấu hình',
                // icon: 'fa-solid fa-gear',
                icon: iconSetting,
                adminMenu: ['users', 'cameras', 'camera-group'],
                children: [
                    {
                        title: "Người dùng",
                        router: { name: 'users' },
                        adminMenu: 'users',
                        onlyAdmin: true,
                    },
                    {
                        title: 'Camera',
                        router: { name: 'cameras' },
                        adminMenu: 'cameras',
                        onlyAdmin: false,
                    },
                    {
                        title: 'Nhóm camera',
                        router: { name: 'camera-group' },
                        adminMenu: 'camera-group',
                        onlyAdmin: true,
                    }
                ],
            },
        ]
        return {
            menus,
            goTo,
            logout,
            activeSidebar,
            isAdmin,
            checkPermission,
            checkIsActive,
            checkIsActiveRootMenu,
        };
    }
};
</script>

<style lang="scss" scoped>
.sidebar {
    .nav {
        padding-top: 30px;
        .nav-item {
            margin-left: 15px !important;

            .nav-link {
                word-break: keep-all;
                align-items: center;
                color: rgb(33, 37, 41, 1);
                background: transparent;

                &:hover {
                    color: #0162e8;
                    background-color: transparent;
                    cursor: pointer;
                }
            }

            .chevron-down {
                transition: all 0.3s ease-in-out;
                font-size: 12px;
            }

            .nav-link[data-bs-toggle='collapse'] {
                &:hover {
                    color: red;
                    background-color: transparent;
                    cursor: pointer;

                    &:hover {
                        .label {
                            color: red;
                        }
                    }
                }
            }

            .nav-link[aria-expanded='true'] {
                .chevron-down {
                    transform: rotate(180deg);
                }

                &:hover {
                    .label {
                        color: #0162e8;
                    }
                }
            }

            .children-item {
                cursor: pointer;

                &:hover {
                    .label {
                        color: #0162e8;
                    }
                }
            }
        }
    }
}
</style>
