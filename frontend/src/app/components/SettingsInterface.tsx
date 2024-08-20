import { useSettings } from "@/context/SettingsContext";

export default function SettingsInterface() {
  const { isDarkMode, toggleDarkMode, isSoundEffectsOn, toggleSoundEffects } = useSettings();

  return (
    <div className='absolute w-[50svh] h-[20svh] flex flex-col justify-center items-center gap-[3svh] bg-sand rounded-[3svh] top-[8.5svh] z-[100]'>
      <div className='w-full flex flex-row justify-center items-center gap-[2svh]'>
        <span onClick={toggleDarkMode}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
        <span onClick={toggleSoundEffects}>
          {isSoundEffectsOn ? 'Sound Effects On' : 'Sound Effects Off'}
        </span>
      </div>
      <div className='w-full flex justify-center items-center gap-[2svh]'>
        new game
      </div>
    </div>
  );
}
