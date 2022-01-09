import React, {useEffect, useState} from 'react';

const DeviceInfo = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[] | undefined>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      setDevices(devices);
    });
  }, [])


  return (
    <div>
      Device Info
      <ul>
        {devices?.sort((d1, d2) => d1.kind?.localeCompare(d2.kind))
          .map((deviceInfo, i) => (
            <li key={i}>
              {deviceInfo.kind} {deviceInfo.label}<br/>
              {/*{JSON.stringify(deviceInfo, null, 2)}*/}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DeviceInfo;
