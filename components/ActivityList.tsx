import React, { memo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface Transaction {
  signature: string;
  slot: number;
  err: any;
  memo: string | null;
  blockTime?: number;
  confirmationStatus?: string;
}

interface ActivityListProps {
  transactions: Transaction[];
  loading?: boolean;
}

const TransactionItem = memo(({ item }: { item: Transaction }) => {
    const openExplorer = () => {
        Linking.openURL(`https://solscan.io/tx/${item.signature}`);
    };

    const date = item.blockTime ? new Date(item.blockTime * 1000).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : "Unknown Date";
    
    const isError = item.err !== null;
    const isSuccess = !isError && (item.confirmationStatus === 'finalized' || !item.confirmationStatus);
    
    const statusColor = isError ? "#EF4444" : "#10B981";
    const statusIcon = isError ? "alert-circle" : "checkmark-circle";
    const statusBg = isError ? "#FEF2F2" : "#ECFDF5";

    return (
      <TouchableOpacity 
        style={styles.item} 
        onPress={openExplorer}
        activeOpacity={0.7}
        testID={`transaction-${item.signature}`}
      >
        <View style={styles.row}>
            <View style={[styles.iconContainer, { backgroundColor: statusBg }]}>
                <Ionicons name={statusIcon} size={20} color={statusColor} />
            </View>
            <View style={styles.info}>
                <Text style={styles.signature} numberOfLines={1} ellipsizeMode="middle">
                    {item.signature}
                </Text>
                <Text style={styles.meta}>
                    {date} • <Text style={{ color: statusColor, fontWeight: "600" }}>{item.confirmationStatus || "Success"}</Text>
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
        </View>
      </TouchableOpacity>
    );
});

export const ActivityList = memo(({ transactions, loading }: ActivityListProps) => {
  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading recent activity...</Text>
      </View>
    );
  }

  if (transactions.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="documents-outline" size={48} color="#D1D5DB" />
        <Text style={styles.emptyText}>No recent activity found</Text>
        <Text style={styles.subEmptyText}>Transactions will appear here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Recent Activity</Text>
        <View style={styles.badge}>
            <Text style={styles.badgeText}>{transactions.length}</Text>
        </View>
      </View>
      
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} />}
        keyExtractor={(item) => item.signature}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    width: "100%",
  },
  center: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },
  badge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3B82F6",
  },
  loadingText: {
    color: "#6B7280",
    marginTop: 12,
    fontSize: 15,
  },
  emptyText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
  },
  subEmptyText: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 0.4)"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  signature: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  meta: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
});
