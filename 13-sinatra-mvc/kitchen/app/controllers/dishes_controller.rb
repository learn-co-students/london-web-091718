class DishController < ApplicationController

  get "/dishes" do
    @dishes = Dish.all.sort_by {|dish| dish.price }
    @type_of_food = 'potatoes'
    erb :"dishes/index"
  end

end
