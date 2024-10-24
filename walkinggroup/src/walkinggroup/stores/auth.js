import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

// 어디서든 사용할 수 있는 useAuthStore
export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref(eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJta0BuYXZlci5jb20iLCJhdXRoIjpbIlJPTEVfVVNFUiJdLCJleHAiOjE3MzAzMzcyNTd9.PO4rbrxVPFHeLFbu0gCzwovA1IgYFdvFcHVdUicqVOQ5nlHkEdvujLbzzd8fejdJ-H9XjfVUZs4arIHBkO5Qqg);
    const userRole = ref(null);

    // 페이지가 로드될 때 localStorage 에서 토큰을 읽어와 상태를 초기화한다.
    onMounted(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            accessToken.value = token;
            // JWT 토큰의 페이로드 추출
            const payload = JSON.parse(atob(token.split('.')[1]));
            userRole.value = payload.auth;
        }
    });

    function login(token) {
        try {

        } catch (error) {
            console.error('토큰 뽑는 중 오류: ', error);
        }
        accessToken.value = token;
        // 새로고침 시 로그인이 풀리는 것을 막기 위해 토큰을 localStorage 에 저장
        localStorage.setItem('accessToken', token);
        // JWT 토큰의 페이로드 추출
        const payload = JSON.parse(atob(token.split('.')[1]));
        userRole.value = payload.auth;
    }

    function logout() {
        accessToken.value = null;
        userRole.value = null;
        localStorage.removeItem('accessToken');
    }

    function isAuthorized(requiredRole) {
        if (!userRole.value) return false;
        // userRole 이 배열로 반환되므로 includes 로 확인
        return userRole.value.includes(requiredRole);
    }

    return { accessToken, userRole, login, logout, isAuthorized };
});