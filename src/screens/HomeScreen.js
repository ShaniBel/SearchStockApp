import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container, Form, Row, Col } from "react-bootstrap"
import StockBox from "../components/StockBox"

const HomeScreen = ({ history }) => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    axios
      .get(
        `https://trautocomplete.azurewebsites.net/api/Autocomplete/GetAutocomplete?name=${keyword}`
      )
      .then((response) => {
        let sortedData = response.data
        sortedData = sortedData.filter((item) => item.category === "ticker")
        sortedData.sort((a, b) => {
          let fa = a.value.toLowerCase(),
            fb = b.value.toLowerCase()

          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        })
        setData(sortedData.slice(0, 9))
      })
      .catch((err) => setError(err))
  }, [keyword])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <Form onSubmit={submitHandler} inline>
            <Form.Control
              type='text'
              name='q'
              onChange={(e) => {
                setKeyword(e.target.value.trim())
              }}
              placeholder='Search Stocks...'
              className='mr-sm-2'
            ></Form.Control>
          </Form>

          <Container>
            <Row>
              {data.length !== 0 &&
                data.map((stock, i) => (
                  <Col
                    key={stock.uid}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={4}
                    className='my-2'
                  >
                    <StockBox stock={stock} stockNum={i} />
                  </Col>
                ))}
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default HomeScreen
