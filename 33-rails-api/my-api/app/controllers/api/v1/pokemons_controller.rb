class Api::V1::PokemonsController < ApplicationController
  def index
    @pokemons = Pokemon.all
    render json: @pokemons
  end

  def create
    @pokemon = Pokemon.new(pokemon_params)
    if @pokemon.save
      render json: @pokemon
    else
      render json: {error: 'Unable to create pokemon.'}, status: 400
    end
  end

  private
  def pokemon_params
    params.require(:pokemon).permit(:name, :image, :user_id)
  end
end
