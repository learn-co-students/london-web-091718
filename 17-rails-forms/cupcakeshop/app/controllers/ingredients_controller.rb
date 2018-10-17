class IngredientsController < ApplicationController
  before_action :set_cupcakes, only: [:new, :edit, :show]
  before_action :set_ingredient, only: [:show, :edit, :update, :destroy]

  def index
    # byebug
    @ingredients = Ingredient.all
  end

  def show
    # byebug
  end

  def new
    @ingredient = Ingredient.new
  end

  def create
    # byebug
    @ingredient = Ingredient.create(ingredient_params)
    if @ingredient.valid?
      redirect_to @ingredient
    else
      flash[:errors] = @ingredient.errors.full_messages
      redirect_to new_ingredient_path
    end
  end

  def update
    # byebug
    @ingredient.update(ingredient_params)
    if @ingredient.valid?
      # byebug
      redirect_to @ingredient
    else
      flash[:errors] = @ingredient.errors.full_messages
      redirect_to edit_ingredient_path(@ingredient)
    end
  end

  def edit
  end

  def destroy
    @ingredient.destroy
    redirect_to ingredients_path
  end

  private

  def ingredient_params
    params.require(:ingredient).permit(:name, cupcake_ids: [])
  end

  def set_ingredient
    @ingredient = Ingredient.find(params[:id])
  end

  def set_cupcakes
    @cupcakes = Cupcake.all
  end
end
