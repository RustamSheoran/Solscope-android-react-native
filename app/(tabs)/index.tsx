import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
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
      // Wait, standard JSON-RPC getBalance returns the integer directly as result?
      // Checking docs: getBalance returns "integer - The balance of the account of provided Pubkey"
      // Actually result is { context: { slot: ... }, value: <lamports> }
      
      // Let's verify the shape dynamically or assume standard response.
      // safely handle if it wraps in value
      const lamports = result?.value !== undefined ? result.value : result;
      setBalance(lamports / 1000000000);
    } else {
        setBalance(null);
    }
  };

  return (
    <View style={styles.container}>
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
      
      {/* Debug Data */}
      {/* <Text style={{marginTop: 20, fontSize: 10}}>{JSON.stringify(data, null, 2)}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
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
