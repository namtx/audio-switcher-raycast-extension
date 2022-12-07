import { runAppleScriptSync } from "run-applescript";

export interface RawDevice {
  _name: string;
  coreaudio_device_output?: number;
  coreaudio_device_input?: number;
  coreaudio_device_transport: string;
  coreaudio_default_audio_output_device?: string;
}

export interface Device {
  name: string;
  isSelected: boolean;
}

const useGetDevices = (): Device[] => {
  const rawData = runAppleScriptSync('return do shell script "/usr/sbin/system_profiler SPAudioDataType -json"');
  const parsedRawDevices: Array<RawDevice> = JSON.parse(rawData)["SPAudioDataType"][0]["_items"];

  return parsedRawDevices
    .filter((rawDevice) => {
      return (
        !!rawDevice.coreaudio_device_output && rawDevice.coreaudio_device_transport === "coreaudio_device_type_builtin"
      );
    })
    .map((rawDevice) => ({
      name: rawDevice._name,
      isSelected: !!rawDevice.coreaudio_default_audio_output_device,
    }));
};

export default useGetDevices;
