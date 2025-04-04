import { useLogin } from "@/app/components/ui/auth/login-form/hooks/use-login";
import {
  TLoginErrorForm,
  TLoginForm,
  loginFormSchema,
} from "@/app/data/schemas.data";
import { useState, type ChangeEvent, type FormEvent } from "react";

const initialState: TLoginForm = { username: "", password: "" };

export const useLoginForm = () => {
  const { mutateAsync, isPending } = useLogin();

  const [loginFormData, setLoginFormData] = useState<Partial<TLoginForm>>({});
  const [validationErrors, setValidationErrors] = useState<TLoginErrorForm>();

  const formData = {
    ...initialState,
    ...loginFormData,
  };

  const validate = () => {
    const result = loginFormSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.format();
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors(undefined);
    return true;
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setLoginFormData((prev) => ({ ...prev, [target.name]: target.value }));
    if (validationErrors?.[target.name as keyof TLoginForm]) {
      setValidationErrors(undefined);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await mutateAsync(formData);
      setValidationErrors(undefined);
    } catch (error) {
      setValidationErrors({
        username: { _errors: ["Неверный логин или пароль"] },
        password: { _errors: ["Неверный логин или пароль"] },
        _errors: ["Неверный логин или пароль"],
      } as TLoginErrorForm);
      console.error(error);
    }
  };

  const isDisabled =
    Object.values(formData).some((value) => !value) ||
    !!validationErrors ||
    isPending;

  return {
    formData,
    handleChange,
    handleSubmit,
    isDisabled,
    isPending,
    errors: validationErrors,
  };
};
