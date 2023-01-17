import Main from "./pages/Main/index";
import Router from "./services/Router";
import Chat from "./pages/Chat/index";
import Error404 from "./pages/Error/Error404/index";
import Error500 from "./pages/Error/Error500/index";
import Profile from "./pages/Profile/index";
import SignIn from "./pages/SignIn/index";
import SignUp from "./pages/SignUp/index";
import ChangeAvatar from "./pages/ChangeAvatar/index";
import ChangePassword from "./pages/ChangePassword/index";

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