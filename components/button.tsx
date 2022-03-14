import Loader from './loader';

interface ButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  type: 'button' | 'submit' | 'reset';
  loading: boolean;
  disabled: boolean;
  className?: string;
  style?: any;
  onClick?: () => void;
}

export default function Button({
  children,
  type,
  loading,
  disabled,
  className,
  style,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      style={{
        ...style
      }}
      {...rest}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}>
      {
        !loading &&
        <>{children}</>
      }
      {
        loading &&
        <i className="m-0 flex items-center justify-center">
          <Loader />
        </i>
      }
    </button>
  );
}
