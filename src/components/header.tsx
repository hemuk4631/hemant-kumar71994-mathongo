import { useSystemTheme } from '../hooks/useSystemTheme';

function Header() {
  const theme = useSystemTheme();
  return (
    <div className="py-6">
      <div>
        <img
          src={`${
            theme === 'dark' ? '/back-button-dark.svg' : '/back-button.svg'
          } `}
          alt="back-button"
          className="mb-4"
        />
        <header className="text-2xl font-bold">Leaderboard</header>
      </div>
      <div className="text-xs font-stretch-100% my-4">
        JEE Main Test series / Quizer Part Test / Quizer Part Test (QPT) - 1
        (Old) / Analysis / Leaderboard
      </div>
    </div>
  );
}

export default Header;
