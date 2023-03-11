import Block from "./block";
import Transaction from "./transaction";

class Blockchain {
    constructor() {
        this.chain = [new Block(Date.now().toString())];
        this.authority = null;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(transactions, authority) {
        // if (authority !== this.authority) {
        //   throw new Error("Invalid authority");
        // }
      
        const block = new Block(Date.now().toString(), transactions);
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();
        block.authority = authority;
      
        this.chain.push(Object.freeze(block));
      
        this.authority = block.hash;
    }

    isValid(blockchain = this) {
        for (let i = 1; i < blockchain.chain.length; i++){
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i-1];
            
            if(currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash){
                return false;
            }
            if(!this.authorities.has(currentBlock.authority)){
                return false;
            }
        }

        return true;
    }

    addAuthority(authority) {
        this.authorities.add(authority);
        this.addTransaction()
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }
}

export default Blockchain;