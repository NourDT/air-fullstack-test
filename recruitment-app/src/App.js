import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import awsAxios from "../src/aws-axios"

import {
    useQuery,
    useQueryClient,
    useMutation,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import Calendar from "react-calendar";
import moment from "moment";
// import Schedules from "./Candidates/schedules/Schedules.jsx";

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Schedules />
        </QueryClientProvider>
    )
}

function Schedules() {
    const queryClient = useQueryClient()
    const [intervalMs, setIntervalMs] = React.useState(1000)
    const [value, setValue] = React.useState('')

    const { status, data: schedules, error, isFetching } = useQuery(
        'todos',
        async () => {
            const res = await awsAxios.get('/dev/list?type=1002')
            return res.data.Items
        },
        {
            // Refetch the data every second
            refetchInterval: intervalMs,
        }
    )

    const addMutation = useMutation(value => fetch(`/api/data?add=${value}`), {
        onSuccess: () => queryClient.invalidateQueries('todos'),
    })

    const clearMutation = useMutation(() => fetch(`/api/data?clear=1`), {
        onSuccess: () => queryClient.invalidateQueries('todos'),
    })

    if (status === 'loading') return <h1>Loading...</h1>
    if (status === 'error') return <span>Error: {error.message}</span>

    let formScheduleIsOpen = false
    let candidateSelected = {}
    const handleSchedule = (data) => {
        console.log(data)
        candidateSelected = data
        formScheduleIsOpen = true
        console.log(formScheduleIsOpen)
    }

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
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                            </p>
                        </div>
                    </Col>
                    <Col className="p-0 col-3">
                        <div className="card card-body border-top-0 border-bottom-0 rounded-0">
                            <Calendar
                                // tileDisabled={({ date }) => date.getDay() === 0}
                                minDate = { moment().toDate() }
                                onChange={ (value) => this.handleTime(value, schedules) }
                            />
                        </div>
                    </Col>
                    { timeIsOpen ?
                        <Col className="p-0 col-3">
                            <div className="card card-body border-0">
                                <span>Date Selected</span>
                                <Button variant='outline-info' className='my-2' onClick={()=>console.log(1)}>01:00pm</Button>
                                <Button variant='outline-info' className='my-2' onClick={()=>console.log(2)}>02:00pm</Button>
                                <Button variant='outline-info' className='my-2' onClick={()=>console.log(3)}>03:00pm</Button>
                                <Button variant='outline-info' className='my-2' onClick={()=>console.log(4)}>04:00pm</Button>
                            </div>
                        </Col> : null
                    }

                </Row>
            </Container>
        </div>
    )
}
