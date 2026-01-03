export function LaunchButton() {
  return (
    <button
      onClick={() => {
        window.location.href = "https://app.therockettree.com";
      }}
      className="
        fixed bottom-8 right-8 z-50
        px-6 py-3 rounded-full
        bg-emerald-400/20 backdrop-blur
        border border-emerald-300/40
        text-emerald-200
        hover:bg-emerald-400/40
        transition-all
      "
    >
      Launch App →
    </button>
  );
}
