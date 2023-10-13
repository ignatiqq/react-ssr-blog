import React from 'react';

import {ChunkLoadingContext} from '@general-infrastructure/libs/chunkLoadingCollector'

type LoadFnType<T> = () => React.LazyExoticComponent<React.ComponentType<T>>;

const clientLoadFn = <T,>(loadFn: LoadFnType<T>) => loadFn();
const serverLoadFn = <T,>(loadFn: LoadFnType<T>, chunkName: string) => {
    const Element = loadFn();

    return (props: T) => (
        <ChunkLoadingContext.Consumer>
            {collector => {
                console.log('ELEMENT', {Element, collector});
                // load before callback
                // @ts-ignore
                const jsx = <Element {...props} />;

                collector.collect(chunkName);
                return jsx;
            }}
        </ChunkLoadingContext.Consumer>
    );
};

export const dynamicLoad = typeof window === 'undefined' ? serverLoadFn : clientLoadFn;