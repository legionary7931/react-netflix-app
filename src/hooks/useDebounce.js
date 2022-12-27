import { useEffect, useState } from 'react'

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    
      return () => {
        clearTimeout(handler); //value, delay가 변경될 때마다 useEffect안에 있는 구문 재호출, 기존 컴포넌트 unmount 위해 return 사용
      }
    }, [value, delay]
  );
  
  return debouncedValue;
}