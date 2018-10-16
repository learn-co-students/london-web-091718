class Customer < ApplicationRecord
  validates :name, presence: true
  has_many :cupcakes
end
