import { FileChunk } from './file-chunk'

export interface Block {
    index: number
    previousHash: string
    fileChunks: FileChunk[]
    timestamp: number
    hash: string
    proof: number
}
