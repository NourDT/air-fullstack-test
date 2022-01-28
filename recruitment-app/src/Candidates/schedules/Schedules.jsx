import Calendar from 'react-calendar'
import DayPicker from 'react-day-picker'
import moment from 'moment'
import {Button, Container, Row, Col, Modal, OverlayTrigger, Tooltip, Alert} from 'react-bootstrap'
// import Add from './ConfirmationForm'

import 'react-calendar/dist/Calendar.css'
import 'react-day-picker/lib/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import React from "react"
import awsAxios from "../../aws-axios"

class Schedules extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            timeIsOpen: false,
            modalIsOpen: false,
            showAlert: false,
            dateSelected: '',
            dateFormatted: '',
            timeSelected: '',
            times: [
                {val: 1, isActive: true, owned: {}},
                {val: 2, isActive: true, owned: {}},
                {val: 3, isActive: true, owned: {}},
                {val: 4, isActive: true, owned: {}}
            ],
            ...props
        }
    }

    handleTime = (date, schedules) => {
        const dateSelected = moment(date).format("YYYY-D-MM")
        const countSched = schedules.filter((skd) => skd.dateSelected === dateSelected)

        if(countSched.length > 0) {
            this.setState(prevState => ({
                times: prevState.times.map(
                    obj => Object.assign(obj, {isActive: true})
                )
            }))
            countSched.map((skd, i) => {
                this.state.times.map((time) => {
                    if(time.val === skd.timeSelected){
                        this.setState(prevState => ({
                            times: prevState.times.map(
                                obj => obj.val === time.val ? Object.assign(obj, {
                                    isActive: false,
                                    owned: this.state.candidates.filter((usr) => usr.id === skd.owner)
                                }) : obj
                            )
                        }))
                    }
                })
            })
        } else {
            this.setState(prevState => ({
                times: prevState.times.map(
                    obj => Object.assign(obj, {isActive: true})
                )
            }))
        }

        this.setState({
            timeIsOpen: true,
            dateSelected: dateSelected,
            dateFormatted: moment(date).format("dddd, D MMMM YYYY")
        })
    }

    handleAdd = (time) => {
        this.setState(prevState => ({
            times: prevState.times.map(
                obj => obj.val === time.val ? Object.assign(obj, {isActive: false, owned: [{name: 'null'}]}) : obj
            ),
            timeSelected: time.val,
            modalIsOpen: true
        }))

    }

    handleSubmit = async (name) => {
        this.setState({
            modalIsOpen: false
        })
        const configParams = {
            userId: this.props.candidate.id,
            dateSelected: this.state.dateSelected,
            timeSelected: this.state.timeSelected,
            type: "SKD"
        }
        console.log("params: ", configParams)
        await awsAxios.post('/dev/schedule', configParams)
            .then( async () => {
                await awsAxios.get('/dev/list?type=1002')
                    .then(res => {
                        const schedules = res.data.Items
                        this.setState({schedules, showAlert: true})
                        console.log(this.state)
                        setTimeout(() => {
                            this.setState({
                                showAlert: false
                            });
                        }, 5000);
                    })
            })

    }

    handleClose = () => {
        this.setState(prevState => ({
            times: prevState.times.map(
                obj => obj.val === this.state.timeSelected ? Object.assign(obj, {isActive: true}) : obj
            ),
            modalIsOpen: false
        }))
    }

    render() {
        const {candidate, schedules} = this.state
        const {timeIsOpen, modalIsOpen, dateFormatted, showAlert} = this.state
        const date = moment().toDate()
        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col className="p-0 col-3">
                            <div className="card card-body border-0">
                                <span>{candidate.name}</span>
                                <h2>The Event </h2>
                                <p className="card-text">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen book.
                                    It has survived not only five centuries, but also the leap into electronic
                                    typesetting, remaining
                                </p>
                            </div>
                        </Col>
                        <Col className="p-0 col-3">
                            <div className="card card-body border-top-0 border-bottom-0 rounded-0">
                                <Calendar
                                    tileDisabled={({date}) => date.getDay() === 0 || date.getDay() === 6}
                                    minDate={moment().toDate()}
                                    onChange={(value) => this.handleTime(value, schedules)}
                                />
                                {/*<DayPicker*/}
                                {/*    initialMonth={new Date()}*/}
                                {/*    disabledDays={[new Date(), { daysOfWeek: [0, 6] }]}*/}
                                {/*    onChange={(value) => this.handleTime(value, schedules)}*/}
                                {/*/>*/}
                            </div>
                        </Col>
                        { timeIsOpen ?
                            <Col className="p-0 col-3">
                                <div className="card card-body border-0">
                                    <span>{dateFormatted}</span>
                                    {
                                        this.state.times.map((time, i) =>
                                            time.isActive ?
                                            <Button variant='outline-info' key={i}
                                                    className='my-2'
                                                    onClick={() => this.handleAdd(time)}>
                                                0{time.val}:00pm
                                            </Button>
                                                :
                                            <OverlayTrigger key={i} overlay={<Tooltip id="tooltip-disabled">Candidate {time.owned[0].name} is booked here</Tooltip>}>
                                                <span style={{ display: 'inline-grid' }}>
                                                <Button disabled variant='outline-dark' key={i}
                                                    className='my-2'
                                                    style={{ pointerEvents: 'none' }}>
                                                     0{time.val}:00pm
                                                </Button>
                                                </span>
                                            </OverlayTrigger>
                                        )
                                    }
                                </div>
                            </Col> : null
                        }

                    </Row>
                </Container>
                <Modal show={modalIsOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please Confirm</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to booked this date?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
                <Alert show={showAlert} variant="success">
                    Appointment has been successfully saved. Thank you!
                </Alert>
            </div>
        )
    }
}

export default Schedules
