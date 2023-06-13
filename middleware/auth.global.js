export default defineNuxtRouteMiddleware((to, from) => {

    const isAuthenticated = useSessionStorage('isLoggedIn', true).value;

    if ( (to.path === "/" || (to.path.includes('details')) ) && !isAuthenticated) {
        return navigateTo('/login');
    }
    else if ( (to.path === "/login" || to.path === "/register") && isAuthenticated) {
        return navigateTo('/');
    }
    else {
        return;
    }
});