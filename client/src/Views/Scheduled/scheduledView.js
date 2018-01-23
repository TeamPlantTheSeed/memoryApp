import React from 'react';
import CardList from '../../Components/CardList'

const listFilter = (card) => !card.notified && card.active;
const fillerText = "No scheduled reminders. Plant a new seed or review existing ones!" ;

export default (props) => (
  <CardList filter={listFilter} filler={fillerText} type="scheduled" {...props}/>
)
