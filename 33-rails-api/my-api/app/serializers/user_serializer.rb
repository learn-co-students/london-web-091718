class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :pokemons
  has_many :pokemons
  class PokemonSerializer < ActiveModel::Serializer
    attributes :id, :name, :image
  end
end
