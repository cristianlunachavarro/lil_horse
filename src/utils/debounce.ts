function debounce(func: () => void, delay: number) {
  let timeout: NodeJS.Timeout | null = null;
  return () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func();
    }, delay);
  };
}

export default debounce;
