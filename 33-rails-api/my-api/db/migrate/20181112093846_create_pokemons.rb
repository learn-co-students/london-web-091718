class CreatePokemons < ActiveRecord::Migration[5.2]
  def change
    create_table :pokemons do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.string :image

      t.timestamps
    end
  end
end
