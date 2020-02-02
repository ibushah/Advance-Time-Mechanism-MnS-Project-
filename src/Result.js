import React, { Component } from 'react';
import { Table, Card, Row, Col } from 'antd';



const columns = [
    {
        title: 'Event',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Arrival Time',
        dataIndex: 'arrivalTime',
        key: 'arrival',
        align: 'center'
    },
    {
        title: 'Serving Time',
        dataIndex: 'servingTime',
        key: 'servingTime',
        align: 'center'
    },
    {
        title: 'Arrived on System',
        key: 'arrivedOnSystem',
        dataIndex: 'arrivedOnSystem',
        align: 'center'

    },
    {
        title: 'Delay',
        dataIndex: 'delay',
        key: 'delay',
        align: 'center',

    },
    {
        title: 'Idle Time',
        dataIndex: 'idleTime',
        key: 'idleTime',
        align: 'center'
    },
    {
        title: 'Departure Time',
        dataIndex: 'departure',
        key: 'departure',
        align: 'center'
    },

];



export default class Result extends Component {



    constructor(props) {

        super(props);

        this.state = {
            events: [],
            averageWaitingTime: 0,
            totalIdleTime: 0,
            busyTime: 0
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


                if (this.state.events[i - 1].departure <= obj.arrivedOnSystem) {
                    obj.delay = 0;
                    obj.idleTime = parseFloat((obj.arrivedOnSystem - this.state.events[i - 1].departure).toFixed(1));
                }
                else {
                    obj.idleTime = 0;
                    obj.delay = parseFloat((this.state.events[i - 1].departure - obj.arrivedOnSystem).toFixed(1));
                }
            }
            else {
                //WHEN ITS FIRST EVENT
                obj.idleTime = obj.arrivedOnSystem;
                obj.delay = 0;
            }

            obj.departure = parseFloat((obj.arrivedOnSystem + obj.servingTime + obj.delay).toFixed(1));
            return obj;
        })

        let avgWaiting = 0, totalIdle = 0, busyTime;
        array.map((d) => {
            avgWaiting += d.delay;
            totalIdle += d.idleTime;
        })
        avgWaiting = (avgWaiting / this.arrivedOnSystem).toFixed(2);
        
        busyTime = (this.arrivedOnSystem - totalIdle).toFixed(1);


        this.setState({
            events: array,
            averageWaitingTime: avgWaiting,
            totalIdleTime: (totalIdle).toFixed(1),
            busyTime
        })
       
    }


    componentDidMount() {
        this.setState({ events: this.props.location.state.events }, this.simulate)
    }
    render() {


        return (
            <div style={{ marginTop: '40px' }}>
                <Row>
                    <Col lg={6} offset={1}>

                        <Card style={{ width: '100%', borderRadius: '40px', backgroundColor: '#66c266', color: 'white' }}>
                            <p style={{ color: 'white', textAlign: 'left', lineHeight: '0px' }}>Average Waiting Time:</p>
                            <h1 style={{ color: 'white', fontSize: '40px' }}>{this.state.averageWaitingTime}</h1>
                        </Card>

                    </Col>
                    <Col lg={6} offset={2}>

                        <Card style={{ width: '100%', borderRadius: '40px', backgroundColor: '#324bc4' }}>
                            <p style={{ color: 'white', textAlign: 'left', lineHeight: '0px' }}>Total Idle Time:</p>
                            <h1 style={{ color: 'white', fontSize: '40px' }}>{this.state.totalIdleTime}</h1>
                        </Card>

                    </Col>
                    <Col lg={6} offset={2}>

                        <Card style={{ width: '100%', borderRadius: '40px', backgroundColor: '#d44646' }}>
                            <p style={{ color: 'white', textAlign: 'left', lineHeight: '0px' }}>Busy Time:</p>
                            <h1 style={{ color: 'white', fontSize: '40px' }}>{this.state.busyTime}</h1>
                        </Card>

                    </Col>
                </Row>
                <Row style={{ marginTop: '40px' }}>
                    <Col lg={22} offset={1}>
                        <Table columns={columns} dataSource={this.state.events} />
                    </Col>
                </Row>


            </div>
        )
    }
}