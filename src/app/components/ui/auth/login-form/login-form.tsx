import { type FC } from "react";
import { Button, TextField } from "@/app/components/common";
import { useLoginForm } from "@/app/components/ui/auth/login-form/hooks/use-login-form";

export const LoginForm: FC = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    isDisabled,
    isPending,
    errors,
  } = useLoginForm();

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
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Пароль"
        error={errors?.password?._errors.join(", ")}
      />

      <Button isLoading={isPending} disabled={isDisabled || isPending}>
        Войти
      </Button>
    </form>
  );
};
