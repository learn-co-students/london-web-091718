class CreatePizzaPizzatoppingToppingAndEaterTables < ActiveRecord::Migration[5.2]
  def change
    create_table :pizzas do |t|
      t.string :name
    end

    create_table :toppings do |t|
      t.string :name
    end

    create_table :pizza_toppings do |t|
      t.integer :pizza_id
      t.integer :topping_id
    end

    create_table :eaters do |t|
      t.string :name
    end
  end
end
