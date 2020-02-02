import React, { Component } from 'react';
import { Input, Card, Button,message, Row, Col, Form } from 'antd';



function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EventData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            events: []
        }
       

    }
    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }

    numberOnly(rule, value, callback) {
        console.log(parseInt(value))

        if (parseInt(value) || parseFloat(value)) {
            callback()
        }
        else {
            callback(" Number only")
        }
    }





    handleSubmit = e => {
        e.preventDefault();
        let {history,match}=this.props;
        this.props.form.validateFields((err, values) => {
        })
            .then((data) => {

                let { arrivalTime, name, servingTime } = data;
                let arr = this.state.events;
                arr.push({
                    key:arr.length,
                    name,
                    arrivalTime:parseFloat(arrivalTime),
                    servingTime:parseFloat(servingTime),
                    idleTime:0,
                    arrivedOnSystem:0,
                    delay: 0,
                    departure: 0
                })
                this.setState({
                    index: this.state.index + 1,
                    events: arr
                }, () => {

                    this.props.form.resetFields();
                    if(this.state.index>=match.params.param)
                    {
                        const key = 'updatable';
                        message.loading({ content: 'Loading...', key });
                    setTimeout(() => {
                        message.success({ content: 'Event data successfully uploaded!', key, duration: 2 })
                        .then(()=>history.push('/result',{ events:this.state.events }))
                      }, 1000);
                    }
                    
                    
                })

            })
    };
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const nameError = isFieldTouched('name') && getFieldError('name');
        const arrivalError = isFieldTouched('arrivalTime') && getFieldError('arrivalTime');
        const servingError = isFieldTouched('servingTime') && getFieldError('servingTime');


        let { param } = this.props.match.params
        let { index } = this.state;


        const eventData = (
            <Row style={{ marginTop: '40px' }}>
                <Col offset={6} xl={12} lg={12}>
                    <Card title={`EVENT ${index+1}`} style={{ backgroundColor: '#F9F9F9', marginTop: '30px', width: '80%', marginLeft: '10%' }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please input the Event Name!' }],
                                })(
                                    <Input
                                        style={{ textAlign: 'center' }} size="large" placeholder="Event Name"

                                        placeholder="name"
                                    />,
                                )}
                            </Form.Item>

                            <Form.Item validateStatus={arrivalError ? 'error' : ''} help={arrivalError || ''}>
                                {getFieldDecorator('arrivalTime', {
                                    rules: [{ required: true, message: 'Please input the Arrival Time!' },
                                    {
                                        validator: this.numberOnly
                                    }]
                                })(
                                    <Input
                                        style={{ textAlign: 'center' }}
                                        size="large"
                                        placeholder="Arrival Time"

                                    />,
                                )}
                            </Form.Item>

                            <Form.Item validateStatus={servingError ? 'error' : ''} help={servingError || ''}>
                                {getFieldDecorator('servingTime', {
                                    rules: [{ required: true, message: 'Please input the Serving Time!' },
                                    {
                                        validator: this.numberOnly
                                    }],

                                })(
                                    <Input
                                        style={{ textAlign: 'center' }}
                                        size="large" placeholder="Serving Time"

                                    />,
                                )}
                            </Form.Item>


                            <Form.Item>
                                <Button style={{ marginTop: '10px', width: '60%', marginLeft: '10%', borderRadius: '0px', color: 'rgba(39, 29, 120, 0.78)', border: '1px solid rgba(39, 29, 120, 0.78)' }} type="primary" htmlType="submit" ghost disabled={hasErrors(getFieldsError())}>
                                    {this.state.index == parseInt(param-1) ? 'SUBMIT' : 'NEXT'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )
        return (
            <div>
                {eventData}
            </div>
        )
    }
}


export default Form.create({ name: 'horizontal_login' })(EventData);