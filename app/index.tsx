import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{
        color: '#9999ff',
        fontSize: 20,
        fontWeight: 'bold',
      }}
      >Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
