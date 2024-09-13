import style from './style.module.css';

export default function Footer() {
  return (
    <div className={style.footer}>
      <div>
        © {new Date().getFullYear()}, Developed with ❤️ by{' '}
        <a href="https://desolint.com" target="_blank">
          Desol Int.
        </a>
      </div>
    </div>
  );
}
