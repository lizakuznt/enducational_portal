import { forwardRef, useImperativeHandle } from "react";
import {
  Button,
  Modal,
  TextAreaField,
  TextField,
} from "@/app/components/common";
import { useOutsideClick } from "@/app/hooks";
import { useCreateProgramForm } from "@/app/components/ui/programs/create-program-form/hooks";

export type TCreateProgramFormRef = { onOpen: () => void };

export const CreateProgramForm = forwardRef<TCreateProgramFormRef>((_, ref) => {
  const {
    formData,
    onChange,
    onSubmit,
    onReset,
    isDisabled,
    isPending,
    errors,
  } = useCreateProgramForm();

  const {
    ref: containerRef,
    isShow,
    setShow,
  } = useOutsideClick(false, onReset);

  useImperativeHandle(ref, () => ({
    onOpen: () => setShow(true),
  }));

  const handleCloseForm = () => {
    setShow(!isShow);
    onReset();
  };

  const handleSubmit = async () => {
    try {
      const result = await onSubmit();
      if (result) handleCloseForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      ref={containerRef}
      isOpen={isShow}
      className="w-full max-w-[450px]"
      onClose={handleCloseForm}
    >
      <div className="flex flex-col gap-6">
        <div className="text-xl text-center font-bold">Создать программу</div>

        <form className="flex flex-col gap-6">
          <TextField
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Название программы"
            error={errors?.name?._errors.join(", ")}
          />

          <TextAreaField
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Описание программы"
            error={errors?.description?._errors.join(", ")}
          />

          <TextField
            name="level"
            value={formData.level}
            onChange={onChange}
            placeholder="Уровень программы"
            error={errors?.level?._errors.join(", ")}
          />

          <TextField
            name="status"
            value={formData.status}
            onChange={onChange}
            placeholder="Статус программы"
            error={errors?.status?._errors.join(", ")}
          />
        </form>

        <div className="flex gap-2 justify-center">
          <Button
            className="w-full max-w-[108px]"
            onClick={handleSubmit}
            disabled={isDisabled}
            isLoading={isPending}
          >
            Создать
          </Button>

          <Button onClick={handleCloseForm}>Отмена</Button>
        </div>
      </div>
    </Modal>
  );
});
