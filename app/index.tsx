
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const PRODUCTS_URL = 'http://localhost:3000/api/products';

const PAGE_SIZE = 5;

export default function Index() {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);

  const fetchProducts = async (currentPage: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const offset = (currentPage - 1) * PAGE_SIZE;

      const result = await axios.request({
        url: PRODUCTS_URL,
        method: 'QUERY',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        data: new URLSearchParams({
          select: 'id,name,price',
          limit: PAGE_SIZE.toString(),
          offset: offset.toString(),
        }).toString(),
      });

      setResponse(result.data);
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        setError(
          requestError.response?.data?.message ||
            requestError.message
        );
      } else {
        setError('Something went wrong while querying products.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const nextPage = () => {
    if (response?.pagination?.hasNextPage) {
      setPage((previousPage) => previousPage + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage((previousPage) => previousPage - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Products</Text>
      <Text style={styles.endpoint}>{PRODUCTS_URL}</Text>

      {isLoading && <ActivityIndicator size="large" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {response?.data && (
        <>
          {response.data.map((product: any) => (
            <View key={product.id} style={styles.product}>
              <Text style={styles.productName}>
                {product.name}
              </Text>

              <Text style={styles.price}>
                ₹{product.price.toLocaleString('en-IN')}
              </Text>
            </View>
          ))}

          <View style={styles.pagination}>
            <Pressable
              onPress={previousPage}
              disabled={page === 1 || isLoading}
              style={[
                styles.button,
                (page === 1 || isLoading) && styles.disabledButton,
              ]}
            >
              <Text style={styles.buttonText}>← Previous</Text>
            </Pressable>

            <Text style={styles.pageText}>
              Page {page}
            </Text>

            <Pressable
              onPress={nextPage}
              disabled={
                !response.pagination.hasNextPage || isLoading
              }
              style={[
                styles.button,
                (!response.pagination.hasNextPage || isLoading) &&
                  styles.disabledButton,
              ]}
            >
              <Text style={styles.buttonText}>Next →</Text>
            </Pressable>
          </View>

          <Text style={styles.total}>
            Showing {response.data.length} of {response.pagination.total}{' '}
            products
          </Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
  },

  endpoint: {
    color: '#666',
    marginBottom: 10,
  },

  error: {
    color: '#c00',
  },

  product: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    gap: 4,
  },

  productName: {
    fontSize: 16,
    fontWeight: '600',
  },

  price: {
    fontSize: 15,
    color: '#555',
  },

  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  button: {
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  disabledButton: {
    opacity: 0.4,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  pageText: {
    fontSize: 16,
    fontWeight: '600',
  },

  total: {
    textAlign: 'center',
    color: '#666',
    marginTop: 4,
  },
});
