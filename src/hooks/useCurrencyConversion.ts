import { useCallback } from "react";

export interface UseCurrencyConversionReturnProps {
    convert: (from: string, to: string, fromValue: number) => number;
}

export interface CurrencyMap {
    from: string;
    to: string;
}

const useCurrencyConversion = ():UseCurrencyConversionReturnProps => {
    const convert = useCallback((from: string, to: string, fromValue: number): number => {
        if( from === 'dollar' && to === 'USDC') {
            return fromValue;
        }
        else if( from === 'USDC' && to === 'dollar') {
            return fromValue;
        }
        else if( from === 'USDC' && to === 'lumens') {
            return fromValue / 0.12 ;
        }
        else if( from === 'lumens' && to === 'USDC') {
            return fromValue * 0.12;
        }
        else if( from === 'dollar' && to === 'TRT') {
            return fromValue / 0.12 ;
        }
        else if( from === 'TRT' && to === 'dollar') {
            return fromValue * 0.12;
        }

        return fromValue;
    },[])

    return { convert };
}

export default useCurrencyConversion;