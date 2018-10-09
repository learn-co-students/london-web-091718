class CreateDishes < ActiveRecord::Migration
  def change
    create_table :dishes do |t|
      t.string :name
      t.integer :price
      t.boolean :available
      t.integer :calorie_count
    end
  end
end
