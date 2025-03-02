export function Footer() {
  return (
    <div className="flex h-16 w-full items-center bg-stone-300 px-10">
      <div className="flex w-full justify-between">
        <span className="text-sm">{`${new Date().getFullYear()} Habit Tracker`}</span>
        <span>🐶 🐻 🐭</span>
      </div>
    </div>
  );
}
