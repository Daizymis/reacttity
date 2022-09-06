import { useCallback, useEffect, useState } from "react";

const useAsyncCallback = (callback) => {
  const [proxyState, setProxyState] = useState({ current: false });

  const fn = useCallback(() => {
    setProxyState({ current: true });
  }, [proxyState]);

  useEffect(() => {
    if (proxyState.current === true) setProxyState({ current: false });
  });

  useEffect(() => {
    proxyState.current && callback();
  });
  return fn;
};

export default useAsyncCallback;
