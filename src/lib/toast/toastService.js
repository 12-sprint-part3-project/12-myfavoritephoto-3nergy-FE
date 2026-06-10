let toastFn = null;

export const setToastHandler = (fn) => {
  toastFn = fn;
};

export const showGlobalToast = (message) => {
  toastFn?.(message);
};
