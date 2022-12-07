import { List, Action, ActionPanel, Icon, Color } from "@raycast/api";
import { runAppleScriptSync } from "run-applescript";
import useGetDevices, { Device } from "./hooks/useGetDevices";
import { useState, useEffect } from "react";

const Index = () => {
  const [outputDevices, setOutputDevices] = useState<Device[]>([]);
  const refreshDataLoop = () => {
    setOutputDevices(useGetDevices());
    setTimeout(() => refreshDataLoop(), 300);
  };

  useEffect(() => {
    setOutputDevices(useGetDevices());
    refreshDataLoop();
  }, []);

  return (
    <List>
      {outputDevices.map((outputDevice) => (
        <List.Item
          icon={
            outputDevice.isSelected
              ? { source: Icon.CheckCircle, tintColor: Color.Green }
              : { source: Icon.CheckCircle, tintColor: Color.SecondaryText }
          }
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
