import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from "../components/Sushi";

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {
          props.sushi.map(item => {
              return <Sushi buySushiHandler={props.buySushiHandler} key={item.id} sushi={item}/>
          })
        }
        <MoreButton moreSushiHandler={props.moreSushiHandler}/>
      </div>
    </Fragment>
  )
};

export default SushiContainer