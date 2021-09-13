import { saveAs } from 'file-saver'
import { action, makeAutoObservable } from 'mobx'
import { HttpClient } from './api'
import { Blockchain, FileLedger, Node } from './types'

class Store {
    public nodeId?: string
    public peers: Record<string, string> = {}
    public fileLedger?: FileLedger
    public blockchain?: Blockchain

    constructor() {
        makeAutoObservable(this)

        this.getNodeId()
        this.getPeers()
        this.getFileLedger()
        this.getBlockchain()
    }

    @action
    public async getNodeId() {
        try {
            const response = await HttpClient.get<string>('id').toPromise()
            if (response?.data) this.nodeId = response.data
        } catch (e) {
            console.log(e)
        }
    }

    @action
    public async getPeers() {
        try {
            const response = await HttpClient.get<Store['peers']>(
                'peers'
            ).toPromise()
            if (response?.data) this.peers = response.data
        } catch (e) {
            console.log(e)
        }
    }

    @action
    public async getFileLedger() {
        try {
            const response = await HttpClient.get<Store['fileLedger']>(
                'ledger'
            ).toPromise()
            if (response?.data) this.fileLedger = response.data
        } catch (e) {
            console.log(e)
        }
    }

    @action
    public async getBlockchain() {
        try {
            const response = await HttpClient.get<Store['blockchain']>(
                'blocks'
            ).toPromise()
            if (response?.data) this.blockchain = response.data
        } catch (e) {
            console.log(e)
        }
    }

    @action
    public async addPeer(node: Node) {
        if (node.id === this.nodeId) return

        try {
            await HttpClient.post<Node, undefined>('peers', node).toPromise()
            this.peers[node.id] = node.address
        } catch (e) {
            console.log(e)
        }
    }

    @action
    public async removePeer(nodeId: string) {
        try {
            await HttpClient.delete('peers/' + nodeId).toPromise()
            delete this.peers[nodeId]
        } catch (e) {
            console.log(e)
        }
    }

    @action
    public async downloadFile(index: number) {
        try {
            const file = await (
                await fetch(process.env.REACT_APP_ROOT + '/download/' + index)
            ).blob()
            saveAs(file, this.fileLedger?.entries[index].name)
        } catch (e) {
            console.log(e)
        }
    }

    @action
    public async upload(formData: FormData) {
        try {
            const response = await HttpClient.post(
                'upload',
                formData,
                true
            ).toPromise()

            if (response?.ok) {
                this.refresh()
            }
        } catch (e) {
            console.log(e)
        }
    }

    @action
    public async refresh() {
        this.getPeers()
        this.getFileLedger()
        this.getBlockchain()
    }
}

export const store = new Store()
