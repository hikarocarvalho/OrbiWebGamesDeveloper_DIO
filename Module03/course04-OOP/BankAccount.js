class BankAccount{
    constructor(agency,accountNumber){
        this._agency = agency;
        this._accountNumber = accountNumber;
        this._type = "";
        this._balance = 0;
    }

    // geters
    getAgency(){
        return this._agency;
    }
    getAccountNumber(){
        return this._accountNumber;
    }
    getType(){
        return this._type;
    }
    getBalance(){
        return this._balance;
    }

    // seters
    setAgency(value){
        this._agency = value;
    }
    setAccountNumber(value){
        this._accountNumber = value;
    }
    setType(value){
        this._type = value;
    }
    setBalance(value){
        this._balance = value;
    }

    // methods
    withdraw(value){
        let message;
        if(this._balance >= value){
            this._balance = this._balance - value;
            message = "Your new account balance is: "
        }else{
            message = "Your account do not have this value. This is you account balance: "
        }
        return message + this._balance
    }
    
    deposit(value){
        this._balance = this._balance + value;
        return this._balance;
    }
}

export default BankAccount;