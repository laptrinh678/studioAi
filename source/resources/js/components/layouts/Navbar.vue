<template>
    <nav
        id="navbar"
        class="px-4 d-flex align-items-center justify-content-between navbar fixed-top"
    >
        <div id="header-left" class="sidebar-left d-flex">
            <div id="logo">
                <a class="btn btn-link height-1 d-flex align-items-center" @click="goHome">
                    <img :src="logoImg" alt="" class="" width="80"/>
                </a>
            </div>

            <a type="button" class="button-trigger d-flex align-items-center" @click="triggerSidebar">
                <img :src="iconArrowLeft" alt="icon_arrow_left" width="20" class="icon-sidebar-open white"/>
                <font-awesome-icon icon="fa-solid fa-bars" class="icon-sidebar-collapse gray--text pl-6"/>
            </a>

            <span class="d-flex align-items-center page-title gray--text ml-20 fs-24">{{ $t(pageTitle) }}</span>
        </div>

        <div v-if="authUser" class="sidebar-right d-flex profile">
            <img
                @click="showDropdown"
                :src="logoUser"
                height="30"
                alt=""
                class="width-4 mr-4"
                id="img_profile"
            />

            <div id="profile" class="menu" v-show="show" ref="ref_profile">
                <h3 class="white--text">{{ authUser.display_name }}<br /><span>{{ authUser.email }}</span></h3>
                <ul>
                    <li>
                        <img :src="logoUser2" class="white" />
                        <a href="/profile"><span>Trang cá nhân</span></a>
                    </li>
                    <li @click="logout">
                        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="gray--text pr-8"/>
                        <a href="#"><span>Đăng xuất</span></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>

import { computed, onMounted, ref, nextTick } from "vue"
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import LogoImg from '@/assets/img/logo/logo_vtcc.png'
import IconArrowLeft from '@/assets/icon/arrow_left_line.png'
import LogoUser from '@/assets/img/users/user4.jpg'
import LogoUser2 from '@/assets/icon/user.png'
import { ACTION_LOGOUT } from '~/store/auth/actions';
import { useI18n } from 'vue-i18n';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const { t } = useI18n();

        const goHome = () => {
            router.push({
                name: 'dashboard',
                params: {},
            });
        };
        const authUser = computed(() => store.getters["authUser"]);
        const pageTitle = computed(() => store.getters["pageTitle"]);

        onMounted(() => {
            handleClickOutside()
        });

        const logoImg = LogoImg;
        const logoUser = LogoUser;
        const logoUser2 = LogoUser2;
        const iconArrowLeft = IconArrowLeft;
        const show = ref(false);

        const logout = () => {
            store.dispatch(ACTION_LOGOUT);
        }

        const ref_profile = ref(null);

        const handleClickOutside = () => {
            $(document).mouseup(function (e) {
                let el = $(ref_profile.value)
                let target = e.target

                if (!el.is(target) && el.has(target).length === 0) {
                    show.value = false
                }
            }.bind(this));
        }

        const showDropdown = () => {
            show.value = !show.value
        }

        onMounted(() => {
            activeToggle()
        });

        const toggleMini = ref(false)

        const triggerSidebar = () => {
            toggleMini.value = !toggleMini.value;

            const sidebar = document.getElementById('sidebar');
            const mainContent = sidebar.parentNode;
            const sidebarWidth = sidebar.offsetWidth;
            const spanList = sidebar.querySelectorAll('span');
            const allSubmenu = sidebar.querySelector('.collapse');

            const header = document.getElementById('header-left');
            const logoDiv = header.querySelector('#logo');
            const logoImg = logo.querySelector('img');
            const iconOpen = header.querySelector('.icon-sidebar-open');
            const iconCollapse = header.querySelector('.icon-sidebar-collapse');

            if (toggleMini.value) {
                logoImg.style.display = 'none';

                logoDiv.style.transition = 'width 0.3s';
                logoDiv.style.width = '0';

                iconOpen.style.display = 'none'
                iconCollapse.style.display = 'block'

                sidebar.style.width = `${sidebarWidth - 128}px`;

                allSubmenu.style.display = 'none';
                spanList.forEach (el => {
                    el.style.display = 'none';
                })

                mainContent.style.paddingLeft = '55px';
            } else {
                logoImg.style.display = 'block';

                logoDiv.style.transition = 'width 0.3s';
                logoDiv.style.width = '150px';

                iconOpen.style.display = 'block'
                iconCollapse.style.display = 'none'

                sidebar.style.width = `${sidebarWidth + 128}px`;

                allSubmenu.style.display = '';
                spanList.forEach (el => {
                    el.style.display = '';
                })

                mainContent.style.paddingLeft = '200px';
            }
        }
        const activeToggle = () => {
            nextTick(() => {
                const sidebar = document.querySelector('#sidebar');
                const active = sidebar.querySelector('.active');

                const header = document.getElementById('header-left');
                const iconOpen = header.querySelector('.icon-sidebar-open');
                const iconCollapse = header.querySelector('.icon-sidebar-collapse');

                if (active) {
                    iconOpen.style.display = 'block'
                    iconCollapse.style.display = 'none'

                    const collapse = active.parentNode.parentNode;
                    collapse.classList.add('show');
                    const navItem = collapse.parentNode
                    const toggle = navItem.querySelector('.nav-link')
                    toggle.ariaExpanded = 'true'
                } else {
                    iconOpen.style.display = 'none'
                    iconCollapse.style.display = 'block'
                }
            });
        }
        return {
            ref_profile,
            pageTitle,
            logoImg,
            logoUser,
            logoUser2,
            iconArrowLeft,
            authUser,
            show,
            goHome,
            logout,
            handleClickOutside,
            triggerSidebar,
            activeToggle,
            showDropdown
        }
    }
}
</script>
<style scoped>
#logo {
    width: 150px;
}
#img_profile {
    cursor: pointer;
}
.profile .profile img {
    background: red;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile .menu {
  position: absolute;
  top: 80px;
  right: 30px;
  padding: 10px 20px;
  background: #fff;
  width: 200px;
  box-sizing: 0 5px 25px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  transition: 0.5s;
}

.profile .menu::before {
  content: "";
  position: absolute;
  top: -5px;
  right: 28px;
  width: 20px;
  height: 20px;
  background: #fff;
  transform: rotate(45deg);
}

.profile .menu h3 {
  width: 100%;
  text-align: center;
  font-size: 18px;
  padding: 20px 0;
  font-weight: 500;
  color: #555;
  line-height: 1.5em;
}

.profile .menu h3 span {
  font-size: 14px;
  color: #cecece;
  font-weight: 300;
}

.profile .menu ul li {
  list-style: none;
  padding: 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
}

.profile .menu ul li img {
  max-width: 20px;
  margin-right: 10px;
  transition: 0.5s;
}

.profile .menu ul li:hover img {
  opacity: 1;
}

.profile .menu ul li a {
  display: inline-block;
  text-decoration: none;
  color: #555;
  font-weight: 500;
  transition: 0.5s;
}

.profile .menu ul li:hover a {
  color: #ff5d94;
}
</style>
