const useIsTestEnv = () => {
  return import.meta.env.MODE === 'test';
};

export { useIsTestEnv };
