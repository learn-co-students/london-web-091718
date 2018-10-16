class AddCustomerIdToCupcakes < ActiveRecord::Migration[5.2]
  def change
    add_column :cupcakes, :customer_id, :integer
  end
end
