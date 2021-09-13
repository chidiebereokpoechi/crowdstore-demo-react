import { FileChunk } from './file-chunk'

export interface LedgerEntry {
    id: string // Unique ID for ledger entry
    name: string // The name of the file before upload
    size: number // Size of the file
    chunks: FileChunk[] // Pieces of the file
    checksum: string // SHA256 hash of file for verification of integrity
}
