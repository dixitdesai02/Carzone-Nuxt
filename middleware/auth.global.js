export default defineNuxtRouteMiddleware((to, from) => {
    
    if (process.server) return;

    const isAuthenticated = useSessionStorage('isLoggedIn', false).value;

    if ( (to.path === "/" || (to.path.includes('details')) ) && !isAuthenticated) {
        return navigateTo('/login');
    }
    else if ( (to.path === "/login" || to.path === "/register") && isAuthenticated) {
        return navigateTo("/");
    }
    else {
        return;
    }
});