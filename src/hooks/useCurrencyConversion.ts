
export interface UseCurrencyConversionReturnProps {
    convert: (from: string, to: string, fromValue: number) => number;
    // refresh: () => void;
}

export interface CurrencyMap {
    from: string;
    to: string;
}

const useCurrencyConversion = ():UseCurrencyConversionReturnProps => {
    const convert = (from: string, to: string, fromValue: number): number => {
        // const fromCurr = currencyMaps.find(item => item.from === from );
        // const toCurr = currencyMaps.find(item => item.to === to);
        // if( !fromCurr || !toCurr ) {
        //     setCurrencyMaps(currencyMaps.concat({from, to}));
        // }

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
    }

    return { convert };
}

export default useCurrencyConversion;