import BankAccount from "./BankAccount.js";

class CurrentAccount extends BankAccount{
    constructor(agency,accountNumber){
        super(agency,accountNumber);
        this.setType("current");
        this._creditCard = 0;
    }

    getCreditCard(){
        return this._creditCard;
    }

    setCreditCard(value){
        this._creditCard = this._creditCard - value;
        return this._creditCard;
    }
}

export default CurrentAccount;