class CustomersController < ApplicationController
  before_action :set_customer, only: [:show, :edit, :update, :destroy]
  before_action :set_cupcakes, only: [:new, :edit]

  def index
    @customers = Customer.all
  end

  def show
  end

  def new
    @customer = Customer.new
  end

  def create
    @customer = Customer.create(customer_params)
    if @customer.valid?
      redirect_to @customer
    else
      flash[:errors] = @customer.errors.full_messages
      redirect_to new_customer_path
    end
  end

  def update
    @customer.update(customer_params)
    if @customer.valid?
      redirect_to @customer
    else
      flash[:errors] = @customer.errors.full_messages
      redirect_to edit_customer_path(@customer)
    end
  end

  def edit
  end

  def destroy
    @customer.destroy
    redirect_to customers_path
  end

  private

  def customer_params
    params.require(:customer).permit(:name, cupcake_ids: [])
  end 

  def set_customer
    @customer = Customer.find(params[:id])
  end

  def set_cupcakes
    @cupcakes = Cupcake.all
  end
end
