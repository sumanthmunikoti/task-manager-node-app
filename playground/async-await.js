const add = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a < 0 || b < 0) {
            return reject('Please enter positive numbers')
        }

        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum = await add(2, 3)
    const sum2 = await add(sum, -4)
    const sum3 = await add(sum2, 5)
    return sum3
}

doWork().then((result) => {
    console.log(result)
}).catch((e) => { 
    console.log(e)
})