function verifySize(arr,size){
    try {
        if(!arr || !size) throw new ReferenceError('no values has sended!');

        if(typeof arr !== 'object') throw new TypeError('Value not espected!');

        if(typeof size !== 'number') throw new TypeError('Value not expected!');

        if(size !== arr.length) throw new RangeError('Range is not the same of the size!');
        
        return arr;
    }catch(e){
        if(e instanceof ReferenceError) return {error:e, message:"you need to send the values"};
        if(e instanceof TypeError) return {error:e, message:"you need to send the correct type of values"};
        if(e instanceof RangeError) return {error:e, message:"you need to send the correct range of this array!"};
        return {error:e, message:"We have caught any error. But this is not identified!"}
    }
}

console.log(verifySize([1,2,3,4,5,6],"6l"));