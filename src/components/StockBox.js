import React from "react"
import { Card } from "react-bootstrap"

const StockBox = ({ stock, stockNum }) => {
  return (
    <Card
      className='my-2 p-2 rounded hovering h-100'
      onClick={() => {
        alert(`position of the stock: ${stockNum + 1}`)
      }}
    >
      <Card.Body>
        <Card.Title as='h4'>
          <strong>{stock.label}</strong>
        </Card.Title>

        <Card.Text as='p'>value: {stock.value}</Card.Text>
        <Card.Text as='p'>category: {stock.category}</Card.Text>
        <Card.Text
          as='p'
          style={{ color: "blue" }}
          onClick={() => {
            alert(`UID: ${stock.uid}`)
          }}
        >
          uid: {stock.uid}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default StockBox
