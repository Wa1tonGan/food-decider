export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  type = 'button',
  className = '' 
}) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
