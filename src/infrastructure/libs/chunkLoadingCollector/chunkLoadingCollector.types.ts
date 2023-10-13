import {ImportedStat} from 'webpack-imported';

type ImportedChunkStatsType = Record<'css' | 'js', string[]>;

type ChunkNameType = string;

type CssImportedChunkType = {
    load: ChunkNameType[];
    preload: ChunkNameType[];
    prefetch: ChunkNameType[];
};
export type ImportedChunksStatsType = Record<string, ImportedChunkStatsType>;
export type ImportedStatsType = ImportedStat;
export type CssAssetsExtractorType = (
    stats: ImportedStatsType,
    chunkName: string | string[],
) => {styles: CssImportedChunkType};

type CollectFunctionType = (chunkName: string) => void;

export type ChunkLoadingCollectorType = {
    collect: CollectFunctionType;
    cssAssetsExtractor: CssAssetsExtractorType;
};