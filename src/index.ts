import Router from "./services/Router";
import Chat from "./pages/Chat/index";
import Profile from "./pages/Profile/index";
import SignIn from "./pages/SignIn/index";
import SignUp from "./pages/SignUp/index";
import ChangeAvatar from "./pages/ChangeAvatar/index";
import Store from "./services/Store/Store";
import "./global.scss";

const router = new Router("#root");

const routes = [
	{
		pathname: "/",
		component: SignIn,
	},
	{
		pathname: "/sign-up",
		component: SignUp,
	},
	{
		pathname: "/messenger",
		component: Chat,
	},
	{
		pathname: "/settings",
		component: Profile,
	},
	{
		pathname: "/change-avatar",
		component: ChangeAvatar,
	},
];

routes.forEach(
	(route) => router.use(
		route.pathname,
		route.component,
	),
);

// Инициировать стор (данные пользователя, чаты и пр. информацию)
// Если получилось, это значит, что юзер уже вошел -
// перенаправляем его сразу в чат
// Если не получилось, то куков нет - ему нужно зарегистрироваться/войти
Store.init()
	.then(() => {
		router.go("/messenger");
		router.start();
	})
	.catch(() => router.start());

export default router;
