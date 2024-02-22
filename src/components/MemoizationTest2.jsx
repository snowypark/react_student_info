import React, { useCallback } from 'react';

function MemoizationTest2({num1, num2}) {

    const fx1 = useCallback(() => {
        return num1 + 10000;
    }, [num1]);

    const fx2 = useCallback(() => {
        return num2 = 20000;
    }, [num2]);

    return (
        <>
            <h3>{fx1()}</h3>
            <h3>{fx2()}</h3>

        </>
    );
}

export default MemoizationTest2;