import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    imageType: 'front'
  }

  toggleImageType = () => {
    this.setState({
      imageType: this.state.imageType === 'front' ? 'back' : 'front'
    })
  }

  render() {
    const hpValue = this.props.pokemon.stats.find(s => s.name === "hp").value;
    const imgSrc = this.props.pokemon.sprites[this.state.imageType]

    return (
      <Card onClick={this.toggleImageType}>
        <div>
          <div className="image">
            <img src={imgSrc} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hpValue}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
