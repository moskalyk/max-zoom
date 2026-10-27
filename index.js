// there's free time, minimal real estate, and a drive to get back on the rodeski
// we'll keep our word, in a band

;(async () => {

    const schedule = [
        [800, 1850],// monday
        [1550, 1850],// tuesday
        [1550, 1850],// wednesday
        [1550, 1850],// thursday
        [800, 1850],// friday
    ]
    
    const dropOffRange = [
        [[800,900],[900,1000],[1000,1100],[1100,1200]] // monday
    ]
    
    const working = []

    // minimal set hours    
    const work = {
        brakePadsChange: 0.6,
        oilChange: 0.1,
        tireChange: 0.1,
        rimChange: 0.3,
        tieRodsChange: 0.4,
        rideShareSCheck: 0.9,
        steeringAdjustment: 0.6
    }
    
    const fieldA = { prob: work['brakePadsChange'], max: 400}
    const fieldB = { prob: work['rimChange'], max: 1000 }
    const fieldC = { prob: work['steeringAdjustment'], max: 800 }
    
    const fields = [fieldA, fieldB, fieldC]
    const wait = (ms) => new Promise((res) => setTimeout(res,ms))
    
    let findWorkingSchedule = (fields) => {
        let timings = []
        let starting = 800
        
        for(let i = 0; i < 3; i++){
            const decField = fields[i].prob * 100 * fields[i].max

            if(decField > 50) {
                
                const quantized = decField * 1;
                const y = Math.abs(0.000001 * (quantized) ** 2) * 32
                const acceptedWork = (y/ 100)
                
                let runner = true
                working.push({demand: fields[i].max, revenue:acceptedWork})

                while(runner){
                    runner = false
                    const w = working[0]
                    for(let k = 0; k < working.length; k++){
                        const w = working[k]
                        
                        if(working[k+1] && w.demand < working[k+1].demand){
                            runner = true
                            const temp = w   
                            working[k] = working[k+1]
                            working[k+1] = temp
                            console.log('notify customer in band')
                        } 
                    }
                }
                
                const time = [starting, starting + fields[i].prob*60]
                
                if(working.length > 0) {
                    starting = starting + fields[i].prob *60
                }
                timings.push(time)
            }
        }
        
        return {pay: working, timings: timings}
    }

    console.log(findWorkingSchedule(fields, working))
})()
