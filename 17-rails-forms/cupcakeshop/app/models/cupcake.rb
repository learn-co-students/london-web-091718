class Cupcake < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  belongs_to :customer
  has_many :cupcake_ingredients
  has_many :ingredients, through: :cupcake_ingredients

  def recipe
    ing_list =  self.ingredients
                    .map {|i| i.name }
                    .join(', ')

    'You need to buy these things: ' + ing_list + ' for that cupcake'
  end
end
