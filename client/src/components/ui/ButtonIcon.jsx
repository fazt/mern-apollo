const ButtonIcon = ({
  icon,
  onClick
}) => {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={onClick}
    >
      {
        icon ? icon : null
      }
    </button>
  );
};

export default ButtonIcon;
