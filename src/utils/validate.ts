const checkEmail = (value: string) => /^[\w-.]+@([\w-]+\.)+[\w-]+$/.test(value);
const checkLogin = (value: string) => /^[A-Za-z][\w\-_]{2,19}$/.test(value);
const checkPassword = (value: string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_]{8,}$/.test(value);
const checkTel = (value: string) => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,9}$/.test(value);
const checkName = (value: string) => /^[А-Я][а-яА-Я-]{1,30}$/u.test(value);

export default function validate(
	type: "email" | "login" | "password" | "tel" | "name" | "text",
	value: string,
): boolean {
	if (!value.length) return false;
	switch (type) {
	case ("email"): return checkEmail(value);
	case ("login"): return checkLogin(value);
	case ("password"): return checkPassword(value);
	case ("tel"): return checkTel(value);
	case ("name"): return checkName(value);
	case ("text"): return true;
	}
}
