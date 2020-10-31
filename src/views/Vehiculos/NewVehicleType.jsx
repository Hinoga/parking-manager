import React from 'react'
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Button from 'components/CustomButtons/Button.js'
const NewVehicleType = ({ handleVehicleType, isFullInfo }) => {
  return (
    <GridContainer>
      <GridItem xs={6}>
        <Button
          color='info'
          size='lg'
          onClick={() => handleVehicleType(true)}
          disabled={isFullInfo}
        >
          Cliente con registro
        </Button>
      </GridItem>
      <GridItem xs={6}>
        <Button
          color='danger'
          size='lg'
          onClick={() => handleVehicleType(false)}
          disabled={!isFullInfo}
        >
          Cliente sin registro
        </Button>
      </GridItem>
    </GridContainer>
  )
}

export default NewVehicleType
