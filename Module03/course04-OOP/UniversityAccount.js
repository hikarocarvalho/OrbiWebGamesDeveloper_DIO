import BankAccount from "./BankAccount.js";

class UniversityAccount extends BankAccount{
    constructor(agency,accountNumber){
        super(agency,accountNumber);
        this.setType("university");
    }

    withdraw(value){
        let message;
        if(value<=500){
            if(value <= this._balance){
                this._balance = this._balance - value;
                message = "Your new balance is: "+ this._balance;
            }else{
                message = "Your account do not have this value!";
            }
        
        }else{
            message = "You do not have permission to withdraw this value!";
        }
        return message;
    }
}

export default UniversityAccount;