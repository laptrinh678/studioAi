export default {
    data() {
        return {
            menus: [
                {
                    title: 'Tổng quan',
                    router: { name: 'dashboard' },
                    adminMenu: 'dashboard',
                    onlyAdmin: false
                },
                {
                    title: 'Giám sát camera',
                    router: { name: 'camera-monitor' },
                    adminMenu: 'camera-monitor',
                    onlyAdmin: false
                },
                {
                    title: 'Cài đặt',
                    permissions: '',
                    activeToggle: '',
                    children: [
                        {
                            title: "Quản lý người dùng",
                            router: { name: 'users' },
                            adminMenu: 'users',
                            onlyAdmin: true,
                        },
                        {
                            title: 'Quản lý camera',
                            router: { name: 'cameras' },
                            adminMenu: 'cameras',
                            onlyAdmin: false,
                        },
                        {
                            title: 'Quản lý nhóm camera',
                            router: { name: 'camera-group' },
                            adminMenu: 'camera-group',
                            onlyAdmin: true,
                        }
                    ],
                },
            ],
            menuShow: {
                dashboard: true,
                users: true,
            },
            sidebarMenu: true,
            toggleMini: false,
        };
    },
    watch: {},
    methods: {
        triggerSidebar() {
            this.toggleMini = !this.toggleMini;
            const sidebar = this.$el;
            const mainContent = sidebar.parentNode;
            const sidebarWidth = sidebar.offsetWidth;
            const sidebarList = sidebar.querySelector('.nav');
            const buttonTrigger = sidebar.querySelector('.button-trigger');
            if (this.toggleMini) {
                buttonTrigger.style.transform = 'rotate(-180deg)';
                sidebarList.style.display = 'none';
                sidebar.style.width = `${sidebarWidth - 160}px`;
                mainContent.style.paddingLeft = '60px';
            } else {
                buttonTrigger.style.transform = 'rotate(0deg)';
                sidebar.style.width = `${sidebarWidth + 160}px`;
                sidebarList.style.display = 'block';
                mainContent.style.paddingLeft = '200px';
            }
        },
        activeToggle() {
            this.$nextTick(() => {
                const sidebar = document.querySelector('#sidebar');
                const active = sidebar.querySelector('.active');
                if (active) {
                    const collapse  = active.parentNode.parentNode;
                    collapse.classList.add('show');
                    const navItem = collapse.parentNode
                    const toggle = navItem.querySelector('.nav-link')
                    toggle.ariaExpanded = 'true'
                }
            });
        },
    },
};
