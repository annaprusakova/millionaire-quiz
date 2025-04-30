import cn from 'classnames';

import styles from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={cn(styles.button, className)} {...props} type="button">
      {children}
    </button>
  );
}
