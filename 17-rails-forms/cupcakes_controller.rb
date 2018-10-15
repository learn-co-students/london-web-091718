class CupcakesController < ApplicationController
  before_action :set_cupcake, only: [:show, :edit, :update, :destroy]

  def index
    @cupcakes = Cupcake.all
  end

  def show
  end

  def new
    @cupcake = Cupcake.new
  end

  def create
    @cupcake = Cupcake.create(cupcake_params)
    if @cupcake.valid?
      redirect_to @cupcake
    else
      flash[:errors] = @cupcake.errors.full_messages
      redirect_to new_cupcake_path
    end
  end

  def edit
  end

  def update
    @cupcake.update(cupcake_params)
    if @cupcake.valid?
      redirect_to @cupcake
    else
      flash[:errors] = @cupcake.errors.full_messages
      redirect_to edit_cupcake_path(@cupcake)
    end
  end

  def destroy
    @cupcake.destroy
    redirect_to cupcakes_path
  end

  private
  def cupcake_params
    params.require(:cupcake).permit(:name, :price)
  end

  def cupcake_price_params
    params.require(:cupcake).permit(:price)
  end

  def set_cupcake
    @cupcake = Cupcake.find(params[:id])
  end
end
