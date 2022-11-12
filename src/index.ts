import Main from "./pages/Main/Main";
import Router from "./services/Router";
import Chat from "./pages/Chat/Chat";
import Error404 from "./pages/Error/Error404/Error404";
import Error500 from "./pages/Error/Error500/Error500";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

const router = new Router('#root');

const routes = [
    {
        pathname: '/',
        component: Main
    },
    {
        pathname: '/chat',
        component: Chat
    },
    {
        pathname: '/error-404',
        component: Error404
    },
    {
        pathname: '/error-500',
        component: Error500
    },
    {
        pathname: '/profile',
        component: Profile
    },
    {
        pathname: '/sign-in',
        component: SignIn
    },
    {
        pathname: '/sign-up',
        component: SignUp
    }
];

routes.forEach(
    route =>
        router.use(
            route.pathname,
            route.component
        )
);

router.start();

routes.forEach(
    (route, idx) => {
        const timeout = (idx + 1) * 1000;
        const backTimeout = (idx + 1 + routes.length) * 1000;
        setTimeout(() => {
            router.go(route.pathname);
        }, timeout);
        setTimeout(() => {
            router.back();
        }, backTimeout);
    }
);