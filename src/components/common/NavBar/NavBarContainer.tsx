//Components
import { CreateWordButton } from "./CreateWordButton";
import { ProfileButton } from "./ProfileButton";

export const NavBarContainer = () => {
  return (
    <nav className="w-screen h-16 fixed top-0 bg-white shadow-sm flex items-center justify-between px-2">
      <h3 className="text-2xl font-medium">Paradise Vocabulary</h3>
      <div className="flex items-center gap-2">
        <CreateWordButton />
        <ProfileButton />
      </div>
    </nav>
  );
};
