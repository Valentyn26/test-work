import { useDispatch, useSelector, useStore } from 'react-redux'
import { AppDispatch, AppStore, RootState } from '@/store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()