import React, { Component } from 'react'

import TechItem from './TechItem'

class TechList extends Component{
  state = {
    newTech: '',
    techs: []
  }

  //Executado quando o componente aparece em tela
  componentDidMount(){
    const techs = localStorage.getItem('techs')

    if(techs){
      this.setState({techs: JSON.parse(techs) })
    }
  }

  //Executado sempre quando houver alterações nas props ou estado
  componentDidUpdate(_, prevState){
    if(prevState.techs !== this.state.techs){
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }
  }


  handleInputChange = e => {
    this.setState({newTech: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()

    this.setState(
      { techs:[...this.state.techs, this.state.newTech],
      newTech: ''
      })
  }

  handleDelete = (tech) => {
    this.setState({ techs: this.state.techs.filter((t) => {
      return t !== tech})})
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <ul>
        {this.state.techs.map(tech => 
         <TechItem 
         key={tech}
         tech={tech}
         onDelete={() => 
          this.handleDelete(tech)}
          />)
        }
        </ul>
        <input
          type="text"
          placeholder="Digite a nova tecnologia"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        >
        </input>
        <button type="submit">Enviar</button>
      </form>
      
    )
  }
}

export default TechList