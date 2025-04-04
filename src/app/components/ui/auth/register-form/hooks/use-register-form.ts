import { useRegister } from "@/app/components/ui/auth/register-form/hooks/use-register";
import {
  registerFormSchema,
  TRegisterErrorForm,
  TRegisterForm,
} from "@/app/data/schemas.data";

import { useState, ChangeEvent, FormEvent } from "react";

const initialState: TRegisterForm = {
  username: "",
  email: "",
  confirmPassword: "",
  password: "",
};

export const useRegisterForm = () => {
  const { mutateAsync, isPending } = useRegister();

  const [registerFormData, setRegisterFormData] = useState<
    Partial<TRegisterForm>
  >({});
  const [validationErrors, setValidationErrors] =
    useState<TRegisterErrorForm>();

  const formData = {
    ...initialState,
    ...registerFormData,
  };

  const validate = () => {
    const result = registerFormSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.format();
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors(undefined);
    return true;
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setRegisterFormData((prev) => ({ ...prev, [target.name]: target.value }));
    if (validationErrors?.[target.name as keyof TRegisterForm]) {
      setValidationErrors(undefined);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { username, email, password, confirmPassword } = formData;
      await mutateAsync({
        username,
        email,
        password,
        password2: confirmPassword,
        role: 4,
      });
    } catch (error: any) {
      const erros: { username?: string[]; email?: string[] } =
        error?.response?.data ?? undefined;
      if (erros?.email) {
        setValidationErrors(
          (prev) =>
            ({
              ...prev,
              email: { _errors: ["Такой email уже зарегистрирован"] },
            } as TRegisterErrorForm)
        );
      }

      if (erros?.username) {
        setValidationErrors(
          (prev) =>
            ({
              ...prev,
              username: { _errors: ["Такой пользовалель уже зарегистрирован"] },
            } as TRegisterErrorForm)
        );
      }
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
