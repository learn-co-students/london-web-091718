class CreateCupcakeIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :cupcake_ingredients do |t|
      t.integer :cupcake_id
      t.integer :ingredient_id

      t.timestamps
    end
  end
end
