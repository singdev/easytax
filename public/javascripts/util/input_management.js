function addSpaceOnNumber(element,value){
    element.value = addThreeSpace(value);
}

function addThreeSpace(value){
    //Remove all none numeric value
    let numericValue = value.toString().replace(/[^0-9.]/g, "").replace(/ /g, "");
    //Add space
    const threeZeroCount = Math.trunc(numericValue.length / 3);
    console.log(threeZeroCount);
    let start = numericValue.length;
    for(let i = 0; i < threeZeroCount; i++){
        const index = start - 3*(i+1);
        if(index == 0){
            break;
        }
        numericValue = addStringAtIndex(numericValue, " ", index); 
    }
    return numericValue.slice(0, numericValue.length);
}

/**
 * 
 * @param {String} str 
 * @param {String} value 
 * @param {Number} index 
 */
function addStringAtIndex(str, value, index){
    return str.slice(0, index) + value + str.slice(index, str.length);
}