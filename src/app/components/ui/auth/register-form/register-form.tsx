import { type FC } from "react";
import { TextField, Button } from "@/app/components/common";
import { useRegisterForm } from "@/app/components/ui/auth/register-form/hooks/use-register-form";

export const RegisterForm: FC = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    isDisabled,
    isPending,
    errors,
  } = useRegisterForm();

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <TextField
        name="username"
        onChange={handleChange}
        value={formData.username}
        placeholder="Имя пользователя"
        error={errors?.username?._errors.join(", ")}
      />

      <TextField
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="E-mail"
        error={errors?.email?._errors.join(", ")}
      />

      <TextField
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Пароль"
        error={errors?.password?._errors.join(", ")}
      />

      <TextField
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Подтвердите пароль"
        error={errors?.confirmPassword?._errors.join(", ")}
      />

      <Button isLoading={isPending} disabled={isDisabled || isPending}>
        Зарегистрироваться
      </Button>
    </form>
  );
};
