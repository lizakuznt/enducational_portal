import { IProgramDto } from "@/@types/IProgramDto";
import { useUpdateProgram } from "@/app/components/ui/programs/edit-program-form/hooks/use-update-program";
import {
  editProgramSchema,
  TEditProgramErrorFrom,
  TEditProgramFrom,
} from "@/app/data/schemas.data";
import { useState, ChangeEvent } from "react";

const initialState: TEditProgramFrom = {
  name: "",
  description: "",
  level: "",
  status: "",
};

export const useEditProgramForm = (programData?: IProgramDto) => {
  const { mutateAsync, isPending } = useUpdateProgram();

  const [progFormData, setProgFormData] = useState<Partial<TEditProgramFrom>>(
    {}
  );

  const [validationErrors, setValidationErrors] =
    useState<TEditProgramErrorFrom>();

  const formData = {
    ...initialState,
    ...programData,
    ...progFormData,
  };

  const validate = () => {
    const result = editProgramSchema.safeParse(formData);
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
    if (validationErrors?.[target.name as keyof TEditProgramErrorFrom]) {
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
      return await mutateAsync({ ...formData });
    } catch (error) {
      throw error;
    }
  };

  const isDisabled =
    Object.values(formData).some((value) => !value) ||
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
