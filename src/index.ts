import Main from "./pages/Main/Main";
import Router from "./services/Router";
import Chat from "./pages/Chat/Chat";
import Error404 from "./pages/Error/Error404/Error404";
import Error500 from "./pages/Error/Error500/Error500";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ChangeAvatar from "./pages/ChangeAvatar/ChangeAvatar";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

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
        pathname: '/change-avatar',
        component: ChangeAvatar
    },
    {
        pathname: '/change-password',
        component: ChangePassword
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

export default router;