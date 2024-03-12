import { useDispatch, useSelector } from 'react-redux';

// use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch = useDispatch;
export const useThunkDispatch = useDispatch;
export const useAppSelector = useSelector;