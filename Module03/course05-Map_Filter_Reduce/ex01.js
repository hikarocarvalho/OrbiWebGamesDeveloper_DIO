class Exercise{
    constructor(){
        this.arrayValues = [1,4,5,7,2];
    }

    mapWithThis(){
        return this.arrayValues.map(value => value*2);
    }

    mapWithOutThis(){
        return [1,4,5,7,2].map(value => value*2)
    }

    filterValues(){
        return this.arrayValues.filter(value => value%2 === 0);
    }

    sumValues(all,value){
        return all + value;
    }

    subPrices(valueList,value){
        return valueList.reduce((finalValue,valueItemList)=>{
            return finalValue - valueItemList;
        },value);
    }

    reduceValues(initialValue){
        return {
            sumArray : this.arrayValues.reduce(this.sumValues,0),
            finalValue : this.subPrices(this.arrayValues,initialValue)
        }
        
    }
}

const exercise = new Exercise();

console.log(exercise.mapWithThis());
console.log(exercise.mapWithOutThis());
console.log(exercise.filterValues());
console.log(exercise.reduceValues(500));
