class AddingEaterIdColumnToPizzaTable < ActiveRecord::Migration[5.2]
  def change
    add_column :pizzas, :eater_id, :integer
  end
end
