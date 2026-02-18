import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSolanaRpc } from "../../hooks/useSolanaRpc";

export default function HomeScreen() {
  const [address, setAddress] = useState("86xCnPeV69n6t3DnyGvkLobRo7cp9662zy8qT9GqG8gh"); // Default devnet/example address or keep empty
  const { callRpc, loading, error, data } = useSolanaRpc();
  const [balance, setBalance] = useState<number | null>(null);

  const handleCheckBalance = async () => {
    if (!address) {
      Alert.alert("Error", "Please enter a Sol address");
      return;
    }

    const result = await callRpc("getBalance", [address]);
    if (result !== null) {
      // result.value is usually the structure for getBalance: { context: {...}, value: <lamports> }
      const lamports = result?.value !== undefined ? result.value : result;
      setBalance(lamports / 1000000000);
    } else {
        setBalance(null);
        if (!error && !loading) {
             Alert.alert("Error", "Failed to fetch balance");
        }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SolScope Lite</Text>
        
        <TextInput
            style={styles.input}
            placeholder="Enter Solana Address"
            value={address}
            onChangeText={setAddress}
            autoCapitalize="none"
        />

        <Button title="Check Balance" onPress={handleCheckBalance} disabled={loading} />

        {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

        {error && <Text style={styles.error}>{error}</Text>}

        {balance !== null && (
            <View style={styles.result}>
                <Text style={styles.balanceLabel}>Balance:</Text>
                <Text style={styles.balance}>{balance.toFixed(4)} SOL</Text>
            </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "white",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  result: {
    marginTop: 30,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
});
