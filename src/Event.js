import React, { Component } from 'react';


export default class Event extends Component {

    constructor(props) {
        super(props);

        this.state = {
            events: [
                { name: 'A', arrivalTime: 0.4, servingTime: 2, arrivedOnSystem: 0, Delay: 0, Departure: 0 },
                { name: 'B', arrivalTime: 1.2, servingTime: 0.7, arrivedOnSystem: 0, Delay: 0, Departure: 0 },
                { name: 'C', arrivalTime: 0.5, servingTime: 0.2, arrivedOnSystem: 0, Delay: 0, Departure: 0 },
                { name: 'D', arrivalTime: 1.7, servingTime: 1.1, arrivedOnSystem: 0, Delay: 0, Departure: 0 },
                { name: 'E', arrivalTime: 0.2, servingTime: 3.7, arrivedOnSystem: 0, Delay: 0, Departure: 0 },
                { name: 'F', arrivalTime: 1.6, servingTime: 0.6, arrivedOnSystem: 0, Delay: 0, Departure: 0 }
            ]
        }
        this.arrivedOnSystem = 0;
    }

    simulate() {
        let array = [];
        array = this.state.events.map((e, i) => {
            let obj = e;
            this.arrivedOnSystem += e.arrivalTime;
            obj.arrivedOnSystem = this.arrivedOnSystem;
            if (this.state.events[i - 1]) {
                if (this.state.events[i - 1].Departure <= obj.arrivedOnSystem)
                    obj.Delay = 0;
                else
                    obj.Delay =  parseFloat((this.state.events[i - 1].Departure - obj.arrivedOnSystem).toFixed(1));
            }
            else {
                obj.Delay = 0;
            }

            obj.Departure = parseFloat((obj.arrivedOnSystem + obj.servingTime + obj.Delay).toFixed(1));
            return obj;
        })

        console.table(array)
    }

    render() {

        this.simulate();
        return (
            <div>
                MY APP
</div>
        )

    }
}