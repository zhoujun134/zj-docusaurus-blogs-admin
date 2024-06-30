import { reactive, readonly } from 'vue';

const state = reactive({
    isLoggedIn: false,
});

export const useUserStore = () => {
    // 登录逻辑，更新状态
    function login() {
        state.isLoggedIn = true;
    }

    // 登出逻辑，更新状态
    function logout() {
        state.isLoggedIn = false;
    }

    return readonly({ ...state, login, logout });
};
