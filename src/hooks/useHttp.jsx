import { useCallback, useEffect, useRef, useState } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortController.signal,
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || "Request failed!");
        }

        return responseData;
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        setErrorMessage(error.message || "Something went wrong.");
        setErrorModalOpen(true);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setErrorMessage("");
    setErrorModalOpen(false);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, errorMessage, errorModalOpen, sendRequest, clearError };
}

export default useHttp;
