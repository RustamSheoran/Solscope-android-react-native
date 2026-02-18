import { useState, useCallback } from 'react';

type RpcParams = any[];

interface RpcResponse<T> {
  jsonrpc: '2.0';
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
  id: string;
}

interface UseSolanaRpcResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  callRpc: (method: string, params?: RpcParams) => Promise<T | null>;
}

const DEFAULT_ENDPOINT = 'https://api.mainnet-beta.solana.com';

export function useSolanaRpc<T = any>(endpoint: string = DEFAULT_ENDPOINT): UseSolanaRpcResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callRpc = useCallback(async (method: string, params: RpcParams = []) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'solscope-app',
          method,
          params,
        }),
      });

      const json: RpcResponse<T> = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      setData(json.result || null);
      return json.result || null;
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { data, loading, error, callRpc };
}
