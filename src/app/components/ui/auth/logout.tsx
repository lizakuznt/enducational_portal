import { Button } from "@/app/components/common";
import { useUserStore } from "@/app/store";

export const Logout = () => {
  const { logout } = useUserStore();

  return (
    <Button className="shrink-0 w-[150px]" onClick={logout}>
      Выйти
    </Button>
  );
};
