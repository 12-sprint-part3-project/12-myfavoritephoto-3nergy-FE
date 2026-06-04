const alignStyles = {
  center: 'items-center justify-center',
  end: 'items-end',
};

export const Overlay = ({ onClose, align = 'center', children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex bg-black/80 ${alignStyles[align]}`}
      onClick={onClose}
    >
      {children}
    </div>
  );
};
