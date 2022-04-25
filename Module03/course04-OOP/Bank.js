import CurrentAccount from './CurrentAccount.js';
import UniversityAccount from './UniversityAccount.js';

class Bank{
    constructor(name){
        this._name=name;
        this.account;
    }

    createAccount(type,agency,accountNumber){
        if(type === "university"){
            this.account = new UniversityAccount(agency,accountNumber);
        }else{
            this.account = new CurrentAccount(agency,accountNumber);
        }
        return {name : this._name , account : this.account};
    }
}


const bank = new Bank("hikaro");

bank.createAccount("university",200,500);

console.log(bank.account.deposit(1000));
console.log(bank.account.withdraw(100));

const bankSecond = new Bank("Joh");

bankSecond.createAccount("current",30,50);

console.log(bankSecond.account.setCreditCard(100));