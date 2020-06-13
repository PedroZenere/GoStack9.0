import React from 'react'
import propTypes from 'prop-types'

function TechItem(props) {
  return(
    <li>
      {props.tech}
      <button onClick={props.onDelete}
       type="button">
       Remover
       </button>
    </li>
  )
}

TechItem.defaultProps = {
  tech: 'Oculto'
};

TechItem.propTypes = {
  tech: propTypes.string,
  onDelete: propTypes.func.isRequired
};

export default TechItem