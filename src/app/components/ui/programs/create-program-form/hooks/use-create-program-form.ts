import { useCreateProgram } from "@/app/components/ui/programs/create-program-form/hooks";
import {
  createProgramSchema,
  TCreateProgramErrorFrom,
  TCreateProgramFrom,
} from "@/app/data/schemas.data";
import { useUserStore } from "@/app/store";
import { useState, type ChangeEvent } from "react";

const initialState: TCreateProgramFrom = {
  name: "",
  description: "",
  level: "",
  status: "",
};
export const useCreateProgramForm = () => {
  const userStore = useUserStore((state) => state.user);
  const { mutateAsync, isPending } = useCreateProgram();

  const [progFormData, setProgFormData] = useState<Partial<TCreateProgramFrom>>(
    {}
  );
  const [validationErrors, setValidationErrors] =
    useState<TCreateProgramErrorFrom>();

  const formData = {
    ...initialState,
    ...progFormData,
  };

  const validate = () => {
    const result = createProgramSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.format();
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors(undefined);
    return true;
  };

  const onChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProgFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
    if (validationErrors?.[target.name as keyof TCreateProgramFrom]) {
      setValidationErrors(undefined);
    }
  };

  const onReset = () => {
    setProgFormData({});
    setValidationErrors(undefined);
  };

  const onSubmit = async () => {
    if (!validate()) return;

    try {
      return await mutateAsync({ ...formData, curator: userStore?.id });
    } catch (error) {
      throw error;
    }
  };

  const isDisabled =
    !Object.values(formData).some((value) => !!value) ||
    !!validationErrors ||
    isPending;

  return {
    formData,
    onChange,
    onSubmit,
    onReset,
    isDisabled,
    isPending,
    errors: validationErrors,
  };
};
