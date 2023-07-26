import logo512 from './../logo512.webp';

function Header() {
  return (
    <header className='app-header'>
      <img src={logo512} alt='React logo' />
      <h1>The React Quiz</h1>
    </header>
  );
}

export default Header;
