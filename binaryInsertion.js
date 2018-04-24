function binaryInsertion(arr, member){
    let left = 0
    let right = arr.length
    let insertionPoint = left + Math.floor((right-left)/2)

    while(left<right){
    
    console.log(arr[insertionPoint])
    if(member<arr[insertionPoint]){
        right=insertionPoint
    }       
    else if(member>arr[insertionPoint]){
        left=insertionPoint+1
    }
    else break
    insertionPoint = left + Math.floor((right-left)/2)
    }
    arr.splice(insertionPoint, 0, member)
    return arr
}


//const res = binaryInsertion([1,2,3,4,6,7,8],5)
//const res = binaryInsertion([34,45,56,67,88,99,101,203,303,500],600)
const res = binaryInsertion([],600)

console.log(res)

module.exports = binaryInsertion