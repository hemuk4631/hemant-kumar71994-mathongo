import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function useDeviceType() {
  const [device, setDevice] = useState<DeviceType>('desktop');

  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 640) return 'mobile';
    if (width >= 640 && width < 1024) return 'tablet';
    return 'desktop';
  };

  useEffect(() => {
    const handleResize = () => setDevice(getDeviceType());
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
}
