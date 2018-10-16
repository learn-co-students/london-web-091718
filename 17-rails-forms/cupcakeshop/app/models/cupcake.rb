class Cupcake < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  belongs_to :customer
end
