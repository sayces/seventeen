import { registrationData } from "../model/validate-registration-schema";

const validate = (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  try {
    registrationData.parse(data);
  } catch (err) {
    console.log(err);
  }
};

export const RegisterPage = () => {
  return (
    <form onSubmit={(e) => validate(new FormData(e.target))}>
      <label htmlFor="email">Электронная почта</label>
      <input id="email" name="email" required />

      <label htmlFor="password">Придумайте пароль</label>
      <input id="password" name="password" type="password" required />

      <label htmlFor="confirmPassword">Подтвердите пароль</label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        required
      />
    </form>
  );
};
