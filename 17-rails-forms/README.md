# lets create a new app

# why validate?

[users](https://camo.githubusercontent.com/bd5a0e0355fa6a8c1f5478f197be5562a479d41a/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f5a665531314f44616e6c6f43412f67697068792e676966)

# forms - what, how, why

# strong params

# checking information before creating + model-level validation

# migration file
```ruby
class CreateCupcakes < ActiveRecord::Migration[5.1]
  def change
    create_table :cupcakes do |t|
      t.string :name
      t.integer :price

      t.timestamps
    end
  end
end
```

# views
```ruby
# _form partial
<% if flash[:errors] %>
  <ul>
    <% flash[:errors].each do |error| %>
      <li><%= error %></li>
    <% end %>
  </ul>
<% end %>

<%= form_for @cupcake do |f| %>
  <%= f.label :name %>
  <%= f.text_field :name %>
  <%= f.label :price %>
  <%= f.text_field :price %>
  <%= f.submit id: 'submit' %>
<% end %>

# edit 
<h1>Edit Cupcake!</h1>

<%= link_to "cancel", cupcake_path(@cupcake) %>

<%= render "form" %>

<%= form_tag cupcake_path, method: "delete" do %>
  <%= submit_tag "Delete Cupcake" %>
<% end %>

# index
<h1>Get yer cupcakes here!</h1>

<%= link_to "Add Cupcake", new_cupcake_path %>

<ul>
  <% @cupcakes.each do |cupcake| %>
    <li><%= link_to cupcake.name, cupcake %> | £<%= cupcake.price %></li>
  <% end %>
</ul>

# new
<h1>Make a new Cupcake!</h1>

<%= link_to "cancel", cupcakes_path %>

<%= render "form" %>

# show
<h1><%= @cupcake.name %></h1>

<p>This costs £<%= @cupcake.price %></p>

<%= link_to "All Cupcakes", cupcakes_path %>
<%= link_to "Edit this cupcake", edit_cupcake_path(@cupcake) %>
```

# model
```ruby
class Cupcake < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0, only_integer: true}
end
```

# controller
```ruby
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
```

# routes
```ruby
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # resources :cupcakes
  
  get "/cupcakes", to: 'cupcakes#index'
  get "/cupcakes/new", to: 'cupcakes#new', as: "new_cupcake"
  get "/cupcakes/:id", to: 'cupcakes#show', as: "cupcake"
  post "/cupcakes", to: 'cupcakes#create'
  get "/cupcakes/:id/edit", to: 'cupcakes#edit', as: 'edit_cupcake'
  patch "/cupcakes/:id", to: 'cupcakes#update'
  put "/cupcakes/:id", to: 'cupcakes#update'
  delete "/cupcakes/:id", to: 'cupcakes#destroy'
end
```
