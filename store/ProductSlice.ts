import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}

export interface Filter {
    text: string;
    categories: string[];
    price: {
        from: string;
        to: string;
    };
    rate: number;
}

interface ProductsState {
    products: Product[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    filter: Filter;
}

const initialState: ProductsState = {
    products: [],
    status: 'idle',
    error: null,
    filter: {
        text: "",
        categories: [],
        price: {
            from: '',
            to: '',
        },
        rate: 0
    }
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
        filterProducts(state, action: PayloadAction<Filter>) {
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

export const { filterProducts } = productsSlice.actions;
export default productsSlice.reducer;

export const selectAllProducts = (state: RootState) => state.products.products;

export const selectFilteredProducts = (state: RootState) => {
    const { products, filter } = state.products;
    return products.filter((product: Product) =>
        product.title.toLowerCase().includes(filter.text.toLowerCase()) &&
        (filter.categories.length === 0 || filter.categories.includes(product.category)) &&
        (filter.price.from === '' || product.price >= +filter.price.from) &&
        (filter.price.to === '' || product.price <= +filter.price.to) &&
        product.rating.rate >= filter.rate
    );
};