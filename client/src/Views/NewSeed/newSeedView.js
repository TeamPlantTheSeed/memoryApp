import React from 'react';
import PropTypes from 'prop-types';
import PlantASeedButton from '../../Components/PlantASeedButton'

const NewSeed = (props, context) => (
  <PlantASeedButton {...props} action={context.createCard}/>
)

NewSeed.contextTypes = {
  createCard: PropTypes.func,
}

export default NewSeed;