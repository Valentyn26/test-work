import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface ProductsState {
    products: Product[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    filter: string;
}

const initialState: ProductsState = {
    products: [],
    status: 'idle',
    error: null,
    filter: ''
};

export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data as Product[];
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productFilterChanged(state, action: PayloadAction<string>) {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.status = 'pending';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            });
    }
});

export const { productFilterChanged } = productsSlice.actions;
export default productsSlice.reducer;

export const selectAllProducts = (state: RootState) => state.products.products;

export const selectFilteredProducts = (state: RootState) => {
    const { products, filter } = state.products;
    if (!filter) return products;
    return products.filter((product: Product) =>
        product.category.toLowerCase().includes(filter.toLowerCase())
    );
};
