import { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Keyboard, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSolanaRpc } from "../../hooks/useSolanaRpc";
import { ActivityList, Transaction } from "../../components/ActivityList";

export default function HomeScreen() {
  const [address, setAddress] = useState("86xCnPeV69n6t3DnyGvkLobRo7cp9662zy8qT9GqG8gh");
  const { callRpc, loading, error } = useSolanaRpc();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isActivityLoading, setIsActivityLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fetchData = useCallback(async () => {
    if (!address) {
      Alert.alert("Input Error", "Please enter a valid Solana address");
      return;
    }
    
    Keyboard.dismiss();
    setBalance(null);
    setTransactions([]);
    setIsActivityLoading(true);

    try {
        const [balanceResult, historyResult] = await Promise.all([
            callRpc("getBalance", [address]),
            callRpc("getSignaturesForAddress", [address, { limit: 10 }])
        ]);

        if (balanceResult !== null) {
            const lamports = balanceResult?.value !== undefined ? balanceResult.value : balanceResult;
            setBalance(lamports / 1000000000);
        }

        if (historyResult && Array.isArray(historyResult)) {
            setTransactions(historyResult);
        }
    } catch (e) {
        console.error("Fetch Data Error:", e);
    } finally {
        setIsActivityLoading(false);
    }
  }, [address, callRpc]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <View style={styles.content}>
        <View style={styles.header}>
            <Text style={styles.title}>SolScope</Text>
            <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Live</Text>
            </View>
        </View>
        
        <View style={styles.searchSection}>
            <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
                <Ionicons name="search" size={20} color={isFocused ? "#3B82F6" : "#9CA3AF"} style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search Solana Address..."
                    placeholderTextColor="#9CA3AF"
                    value={address}
                    onChangeText={setAddress}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    returnKeyType="search"
                    onSubmitEditing={fetchData}
                    selectionColor="#3B82F6"
                />
                {address.length > 0 && (
                     <TouchableOpacity onPress={() => setAddress("")}>
                        <Ionicons name="close-circle" size={18} color="#D1D5DB" />
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity 
                style={[styles.goButton, (loading || isActivityLoading) && styles.goButtonDisabled]} 
                onPress={fetchData} 
                disabled={loading || isActivityLoading}
                activeOpacity={0.8}
            >
                {loading || isActivityLoading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Ionicons name="arrow-forward" size={20} color="white" />
                )}
            </TouchableOpacity>
        </View>

        {error && (
            <View style={styles.errorContainer}>
                <Ionicons name="warning" size={16} color="#EF4444" />
                <Text style={styles.errorText}>{error}</Text>
            </View>
        )}

        {balance !== null && (
            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Total Balance</Text>
                <View style={styles.balanceRow}>
                    <Text style={styles.balanceValue}>{balance.toFixed(4)}</Text>
                    <Text style={styles.currency}>SOL</Text>
                </View>
                <View style={styles.walletInfo}>
                    <Text style={styles.walletAddress} numberOfLines={1} ellipsizeMode="middle">{address}</Text>
                    <Ionicons name="copy-outline" size={14} color="#6B7280" style={{ marginLeft: 6 }} />
                </View>
            </View>
        )}

        <ActivityList transactions={transactions} loading={isActivityLoading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#059669",
  },
  searchSection: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  inputFocused: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    height: '100%',
  },
  goButton: {
    width: 52,
    height: 52,
    backgroundColor: "#111827",
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  goButtonDisabled: {
    opacity: 0.6,
    backgroundColor: "#4B5563",
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FEF2F2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "500",
  },
  balanceCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  balanceValue: {
    fontSize: 42,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -1.5,
  },
  currency: {
    fontSize: 20,
    fontWeight: "600",
    color: "#9CA3AF",
    marginLeft: 6,
  },
  walletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#F3F4F6",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  walletAddress: {
    fontSize: 13,
    color: "#4B5563",
    fontWeight: "500",
    maxWidth: 150,
  },
});
