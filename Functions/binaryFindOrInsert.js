function Letter(letter){
    this.letter = letter
    this.frequency = 0
    this.children = []
}


function binaryFindOrInsert(arr, member){
    let left = 0
    let right = arr.length
    let insertionPoint = left + Math.floor((right-left)/2)

    while(left<right){
    
    console.log(arr[insertionPoint])
    if(member<arr[insertionPoint].letter){
        right=insertionPoint
    }       
    else if(member>arr[insertionPoint].letter){
        left=insertionPoint+1
    }
    else return arr[insertionPoint]
    insertionPoint = left + Math.floor((right-left)/2)
    }
    arr.splice(insertionPoint, 0, member)
    return arr
}

module.exports = binaryFindOrInsert