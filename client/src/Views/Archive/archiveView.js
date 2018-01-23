import React from 'react';
import CardList from '../../Components/CardList'

const listFilter = (card) => !card.active;
const fillerText = "Nothing in your archive yet. Guess right what the seed was before it blossoms!" ;

export default (props) => (
  <CardList filter={listFilter} filler={fillerText} type="archived" {...props}/>
)
