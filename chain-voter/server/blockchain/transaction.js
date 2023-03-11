class Transaction{
    constructor(sender, reciever, choice) {
        this.sender = sender;
        this.reciever = reciever;
        this.choice = choice;
        this.timestamp = Date.now();
    }

    toString() {
        return JSON.stringify(this);
    }
}

export default Transaction;