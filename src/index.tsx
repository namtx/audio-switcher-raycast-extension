import { List, Action, ActionPanel } from "@raycast/api";
import { runAppleScriptSync } from "run-applescript";
import useGetDevices from "./hooks/useGetDevices";

const Index = () => {
  const outputDevices = useGetDevices();
  return (
    <List>
      {outputDevices.map((outputDevice) => (
        <List.Item
          key={outputDevice.name}
          title={outputDevice.name}
          actions={
            <ActionPanel>
              <Action
                title="Switch to"
                onAction={() => {
                  runAppleScriptSync(`do shell script "/opt/homebrew/bin/SwitchAudioSource -s '${outputDevice.name}'"`);
                }}
              />
            </ActionPanel>
          }
        ></List.Item>
      ))}
    </List>
  );
};

export default Index;
