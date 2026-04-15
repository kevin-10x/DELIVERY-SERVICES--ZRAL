import { Text, View, Button, TextInput } from "react-native";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [item, setItem] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

  const order = async () => {
    await axios.post("http://localhost:5000/order", { item, name, location, phone });
    alert("Order placed!");
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, textAlign: "center" }}>🚚 Baraton Express</Text>

      <TextInput
        placeholder="Name"
        onChangeText={setName}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Location"
        onChangeText={setLocation}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Item"
        onChangeText={setItem}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Phone"
        onChangeText={setPhone}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
      />

      <Button title="Order" onPress={order} />
    </View>
  );
}
