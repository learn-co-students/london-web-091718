class Ingredient < ApplicationRecord
  validates :name, presence: true, length: { minimum: 2, maximum: 240 }, uniqueness: true
  has_many :cupcake_ingredients
  has_many :cupcakes, through: :cupcake_ingredients
end
