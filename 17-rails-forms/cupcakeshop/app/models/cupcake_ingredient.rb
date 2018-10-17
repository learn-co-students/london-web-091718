class CupcakeIngredient < ApplicationRecord
  belongs_to :cupcake
  belongs_to :ingredient
end
