import React from 'react';
import CardList from '../../Components/CardList'

const listFilter = (card) => card.notified;
const fillerText = "You don't have any seeds to take care of yet. Check back later!" ;

export default (props) => (
  <CardList filter={listFilter} filler={fillerText} type="active" {...props}/>
)
