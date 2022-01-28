import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import awsAxios from "../aws-axios"

import {
    useQuery,
    useQueryClient,
    useMutation,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import 'react-calendar/dist/Calendar.css'
import 'bootstrap/dist/css/bootstrap.css'
import Schedules from "./schedules/Schedules.jsx";
import axios from "axios";

class Candidates extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            formScheduleIsOpen: false,
            candidates: [],
            candidateSelected: {},
            schedules: [],
            status: 'loading'
        }
    }

    componentDidMount = async () => {
        await awsAxios.get('/dev/list?type=1001')
            .then(res => {
                const candidates = res.data.Items
                this.setState({candidates, status: res.data.status})
            })
        await awsAxios.get('/dev/list?type=1002')
            .then(res => {
                const schedules = res.data.Items
                console.log(schedules)
                this.setState({schedules})
            })
    }


    getCandidates = () => {
        const [intervalMs] = React.useState(1000)
        const { status, data, error, isFetching } = useQuery(
            'todos',
            async () => {
                const res = await awsAxios.get('/dev/list?type=1001')
                this.setState({ candidates: res.data})
                return res.data
            },
            {
                // Refetch the data every second
                refetchInterval: intervalMs,
            }
        )
    }

    handleAdd = (data) => {
        console.log(data)
        this.setState({
            candidateSelected: data
        })

        this.handleScheduleIsOpen(true)
    }

    handleScheduleIsOpen = isOpen => {
        this.setState({
            formScheduleIsOpen: isOpen
        });
    };

    render() {
        if (this.state.status === 'loading') return <h1>Loading...</h1>
        const { candidates, schedules, candidateSelected, formScheduleIsOpen } = this.state
        return (
            <div>
                <br/>
            <Container>
                <Row className="justify-content-md-center">
                    <Col className="p-1 col-6">
                        <div className="card card-body border-1">
                            <h3>Hello </h3>
                            <p className="card-text">
                                Please select your candidate to add some schedule
                            </p>
                            { candidates.map((data, i) => {
                                return (
                                    <Button variant='outline-info'
                                        className='my-2'
                                        onClick= { () => this.handleAdd(data) }
                                        key={i} > {data.name}
                                    </Button>
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
                <br/>
                {
                    formScheduleIsOpen ?
                        <Schedules
                            candidates={candidates}
                            candidate={ candidateSelected }
                            schedules={ schedules }
                            isFormVisible={ formScheduleIsOpen }/> :
                        null
                }
            </div>
        )
    }
}

export default Candidates
