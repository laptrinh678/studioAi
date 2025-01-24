<template>
  <div class="wrapper">
    <nav id="sidebar" class="sidebar js-sidebar" :class="{'collapsed': sideBarToggle}">
      <div class="sidebar-content js-simplebar">
        <div class="sidebar-brand" >
          <span class="align-middle">Admin</span>
        </div>

        <ul class="sidebar-nav">
          <li class="sidebar-header">
            {{ $t('user_management.user') }}
          </li>

          <li class="sidebar-item" :class="{'active': tabActive === 'user-permission'}">
            <div class="sidebar-link" @click="tabActive = 'user-permission'">
              <div>
                <avatar-icon width="20px" height="20px" />
                <span class="align-middle">{{ $t('user_management.left_bar.permission') }}</span>
              </div>
            </div>
          </li>

          <li class="sidebar-item" :class="{'active': tabActive === 'user-prompt'}">
            <div class="sidebar-link" @click="tabActive = 'user-prompt'">
              <div>
                <info-icon width="20px" height="20px" />
                <span class="align-middle">{{ $t('user_management.left_bar.prompt') }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div class="main">
      <nav class="navbar navbar-expand navbar-light navbar-bg">
        <div class="sidebar-toggle js-sidebar-toggle" @click="sideBarToggle = !sideBarToggle">
          <i class="hamburger align-self-center"></i>
        </div>
      </nav>

      <main class="content main-user-management w-100">
        <div class="container-fluid p-0">
          <user-permission-component v-if="tabActive === 'user-permission'" />
          <user-prompt-component v-else-if="tabActive === 'user-prompt'" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AvatarIcon from "../../components/icons/Avatar.vue"
import InfoIcon from "../../components/icons/Infomation.vue"
import {ref} from "vue";
import UserPermissionComponent from "../User.vue"
import UserPromptComponent from "./Prompt/PromptGenerate.vue"

const tabActive = ref('user-permission')
const sideBarToggle = ref(false)

</script>
<style scoped lang="scss">
.wrapper {
  align-items: stretch;
  background: #222e3c;
  display: flex;
  width: 100%
}

.sidebar {
  direction: ltr;
  max-width: 210px;
  min-width: 210px;
}

.sidebar.collapsed {
  margin-left: -210px;
}

@media (min-width: 1px)and (max-width: 991.98px) {
    .sidebar {
        margin-left: -210px
    }

    .sidebar.collapsed {
        margin-left: 0
    }
}

#sidebar {
  position: unset;
  overflow: hidden;
}

.sidebar-brand {
  color: #f8f9fa;
  display: block;
  font-size: 1.15rem;
  font-weight: 600;
  padding: 1.15rem 1.5rem;

  &:hover {
    color: #f8f9fa;
    text-decoration: none
  }

  &:focus {
    outline: 0
  }
}

.sidebar-nav {
  flex-grow: 1;
  list-style: none;
  margin-bottom: 0;
  padding-left: 0
}

.sidebar-header {
  background: transparent;
  color: #ced4da;
  font-size: .75rem;
  padding: 1.5rem 1.5rem .375rem
}

.sidebar-item.active .sidebar-link:hover, .sidebar-item.active > .sidebar-link {
  background: linear-gradient(90deg, rgba(59, 125, 221, .1), rgba(59, 125, 221, .088) 50%, transparent);
  border-left-color: #3b7ddd;
  color: #e9ecef
}

.sidebar-item.active .sidebar-link:hover i, .sidebar-item.active .sidebar-link:hover svg, .sidebar-item.active > .sidebar-link i, .sidebar-item.active > .sidebar-link svg {
  color: #e9ecef
}

.sidebar-link {
  border-left: 3px solid transparent;
  color: rgba(233, 236, 239, .5);
  cursor: pointer;
  display: block;
  font-weight: 400;
  padding: .625rem 1.625rem;
  position: relative;
  text-decoration: none;
  transition: background .1s ease-in-out;

  &:focus {
    outline: 0;
  }

  &:hover {
    background: #222e3c;
    border-left-color: transparent;
    color: rgba(233, 236, 239, .75);
  }
}

.sidebar-link i, .sidebar-link svg, a.sidebar-link i, a.sidebar-link svg {
  color: rgba(233, 236, 239, .5);
  margin-right: .75rem
}

.main {
  background: #f5f7fb;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  min-width: 0;
  transition: margin-left .35s ease-in-out, left .35s ease-in-out, margin-right .35s ease-in-out, right .35s ease-in-out;
  width: 100%
}

.navbar {
    --bs-navbar-padding-x: 1.375rem;
    --bs-navbar-padding-y: 0.875rem;
    --bs-navbar-color: rgba(var(--bs-emphasis-color-rgb), 0.65);
    --bs-navbar-hover-color: rgba(var(--bs-emphasis-color-rgb), 0.8);
    --bs-navbar-disabled-color: rgba(var(--bs-emphasis-color-rgb), 0.3);
    --bs-navbar-active-color: rgba(var(--bs-emphasis-color-rgb), 1);
    --bs-navbar-brand-padding-y: 0.875rem;
    --bs-navbar-brand-margin-end: 1rem;
    --bs-navbar-brand-font-size: 1.15rem;
    --bs-navbar-brand-color: rgba(var(--bs-emphasis-color-rgb), 1);
    --bs-navbar-brand-hover-color: rgba(var(--bs-emphasis-color-rgb), 1);
    --bs-navbar-nav-link-padding-x: 0.5rem;
    --bs-navbar-toggler-padding-y: 0.25rem;
    --bs-navbar-toggler-padding-x: 0.75rem;
    --bs-navbar-toggler-font-size: 0.925rem;
    --bs-navbar-toggler-icon-bg: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(73, 80, 87, 0.75)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    --bs-navbar-toggler-border-color: rgba(var(--bs-emphasis-color-rgb), 0.15);
    --bs-navbar-toggler-border-radius: var(--bs-border-radius);
    --bs-navbar-toggler-focus-width: 0.2rem;
    --bs-navbar-toggler-transition: box-shadow 0.15s ease-in-out;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: var(--bs-navbar-padding-y) var(--bs-navbar-padding-x);
    position: relative
}

.navbar-expand {
    flex-wrap: nowrap;
    justify-content: flex-start
}

.sidebar-toggle {
    cursor: pointer;
    display: flex;
    height: 26px;
    width: 26px;
    margin-right: 1rem;
}

.hamburger, .hamburger:after, .hamburger:before {
    background: #495057;
    border-radius: 1px;
    content: "";
    cursor: pointer;
    display: block;
    height: 3px;
    transition: background .1s ease-in-out, color .1s ease-in-out;
    width: 24px
}

.hamburger {
    position: relative;

    &::before {
      position: absolute;
      top: -7.5px;
      width: 24px
    }

    &::after {
      bottom: -7.5px;
      position: absolute;
      width: 16px;
    }
}

.content {
  direction: ltr;
  flex: 1;
  max-width: 100vw;
  padding: 1.5rem 1.5rem .75rem;
  width: 100vw;
  background-color: #ffffff;

  @media (min-width: 768px) {
    .content {
        max-width: auto;
        width: auto
    }
  }

  @media (min-width: 992px) {
      .content {
          padding: 3rem 3rem 1.5rem
      }
  }
}
</style>