import { registrationData } from "../model/validate-registration-schema";

const validate = (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  try {
    registrationData.parse(data);
  } catch (err) {
    console.log(err);
  }
};

export const LoginPage = () => {
  return (
    <form onSubmit={(e) => validate(new FormData(e.target))}>
      <label htmlFor="email">Электронная почта</label>
      <input id="email" name="email" required />

      <label htmlFor="password">Пароль</label>
      <input id="password" name="password" type="password" required />
    </form>
  );
};
