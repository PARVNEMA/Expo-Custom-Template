import { NativeTabs } from "expo-router/unstable-native-tabs";
 
export default function TabsLayout() {
  return (
<NativeTabs
      backgroundColor="#D9E7CB"
      indicatorColor="#3A6B32"
      tintColor="#3A6B32"
      iconColor={{ default: "#71796C", selected: "#BDEDB4" }}
      rippleColor="transparent"
      labelStyle={{ fontSize: 11, fontWeight: "900", color: '#71796C' }}
      
>
<NativeTabs.Trigger name="home">
<NativeTabs.Trigger.Icon
          md={{ default: "home", selected: "home" }}
          sf={{ default: "house", selected: "house.fill" }}
        />
<NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
</NativeTabs.Trigger>
 
      <NativeTabs.Trigger name="demo">
<NativeTabs.Trigger.Icon
          md={{ default: "receipt_long", selected: "receipt_long" }}
          sf={{ default: "doc.text", selected: "doc.text.fill" }}
        />
<NativeTabs.Trigger.Label>Challans</NativeTabs.Trigger.Label>
</NativeTabs.Trigger>
 
      <NativeTabs.Trigger name="profile">
<NativeTabs.Trigger.Icon
          md={{ default: "person", selected: "person" }}
          sf={{ default: "person", selected: "person.fill" }}
        />
<NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
</NativeTabs.Trigger>
</NativeTabs>
  ); }