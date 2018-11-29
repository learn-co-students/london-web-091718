import React from "react";
import YourBotArmy from './YourBotArmy'
import BotCollection from './BotCollection'
import BotSpecs from '../components/BotSpecs'

const botsUrl = 'https://bot-battler-api.herokuapp.com/api/v1/bots'

class BotsPage extends React.Component {
  //start here with your code for step one

  state = {
    bots: [],
    enlistedBotIds: [],
    selectedBotId: undefined
  }

  componentDidMount() {
    fetch(botsUrl)
      .then(res => res.json())
      .then(bots => this.setState({ bots }))
  }

  enlistBot = bot => {
    if (this.state.enlistedBotIds.includes(bot.id)) return;

    this.setState({
      enlistedBotIds: [...this.state.enlistedBotIds, bot.id]
    })
  }

  delistBot = bot => {
    this.setState({
      enlistedBotIds: this.state.enlistedBotIds.filter(id => id !== bot.id)
    })
  }

  selectBot = bot => {
    this.setState({
      selectedBotId: bot.id
    })
  }

  deleselectBot = () => {
    this.setState({
      selectedBotId: undefined
    })
  }

  getBotById = id => this.state.bots.find(bot => bot.id === id)

  getBotsFromIds = (ids) => this.state.bots.filter(bot => ids.includes(bot.id))

  enlistAndDeselectSelectedBot = () => {
    this.enlistBot({ id: this.state.selectedBotId })
    this.deleselectBot()
  }

  render() {
    return (
      <div>
        <YourBotArmy handleBotCardClick={this.delistBot} bots={this.getBotsFromIds(this.state.enlistedBotIds)} />
        {
          this.state.selectedBotId === undefined ?
            <BotCollection handleBotCardClick={this.selectBot} bots={this.state.bots} /> :
            <BotSpecs enlistBot={this.enlistAndDeselectSelectedBot} back={this.deleselectBot} bot={this.getBotById(this.state.selectedBotId)} />
        }
      </div>
    );
  }

}

export default BotsPage;
