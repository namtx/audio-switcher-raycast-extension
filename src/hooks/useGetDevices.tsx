import { runAppleScriptSync } from "run-applescript";

export interface RawDevice {
  _name: string;
  coreaudio_device_output?: number;
  coreaudio_device_input?: number;
}
export interface Device {
  name: string;
}

const useGetDevices = (): Device[] => {
  const rawData = runAppleScriptSync('return do shell script "/usr/sbin/system_profiler SPAudioDataType -json"');
  const parsedRawDevices: Array<RawDevice> = JSON.parse(rawData)["SPAudioDataType"][0]["_items"];

  return parsedRawDevices.map((rawDevice) => ({
    name: rawDevice._name,
  }));
};

export default useGetDevices;
