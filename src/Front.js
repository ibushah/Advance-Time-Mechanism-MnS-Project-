import React, { Component, useRef, useState } from 'react';
import Img from './assets/schedule.png'
import { Input, Card, Button, Row, Col, Alert } from 'antd';


const Front = (props) => {

    const [errorShow, changeError] = useState(false);

    const inputRef = useRef();

    const imgStyle = {
        width: '80%'
    }

    const eventsSend = () => {

        let { value } = inputRef.current.state;

        if (parseInt(value)) {
            changeError(false);
            props.history.push("data/" + value)
        }
        else
            changeError(true)

    }
    return (
        <Row style={{ marginTop: '100px' }}>
            <Col md={24} xl={12} lg={12}>  <img src={Img} style={imgStyle} /></Col>
            <Col md={24} xl={12} lg={12}>
                <Card title="Number of Events" style={{ backgroundColor: '#F9F9F9', marginTop: '30px', width: '80%', marginLeft: '10%' }}>
                    <Input size="large" ref={inputRef} placeholder="Events" />
                    {errorShow && <Alert message="Error: Enter number only!" type="error" showIcon />}
                    <Button onClick={eventsSend} style={{ marginTop: '10px', width: '60%', marginLeft: '10%', borderRadius: '0px', color: 'rgba(39, 29, 120, 0.78)', borderColor: 'rgba(39, 29, 120, 0.78)' }} type="primary" ghost>
                        Submit
                 </Button>
                </Card>
            </Col>
        </Row>

    )
}

export default Front;