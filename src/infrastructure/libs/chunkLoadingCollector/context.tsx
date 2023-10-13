import React, {PropsWithChildren, useRef} from 'react';

import {importAssets} from 'webpack-imported';

import {ChunkLoadingCollector} from './chunkLoadingCollector';
import {ChunkLoadingCollectorType} from './chunkLoadingCollector.types';

export const ChunkLoadingContext = React.createContext<{collect: ChunkLoadingCollectorType['collect']}>({
    collect: new ChunkLoadingCollector(importAssets).collect,
});

type PropsType = {
    collector: ChunkLoadingCollectorType;
};

/**
 * ChunkLoadingProvider
 */
export const ChunkLoadingProvider: React.FC<PropsWithChildren<PropsType>> = ({
    collector,
    children,
}) => {
    const chunkCollectorRef = useRef<ChunkLoadingCollectorType>(collector);

    console.log('collector in provider', {extractor: collector.cssAssetsExtractor});

    return (
        <ChunkLoadingContext.Provider value={chunkCollectorRef.current}>
            {children}
        </ChunkLoadingContext.Provider>
    );
};