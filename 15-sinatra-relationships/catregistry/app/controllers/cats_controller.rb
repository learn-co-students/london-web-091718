class CatsController < ApplicationController

  get "/cats" do
    @cats = Cat.all
    erb :"cats/index"
  end

  get "/cats/new" do
    erb :"cats/new"
  end

  get "/cats/:id" do
    @cat = Cat.find(params[:id])
    erb :"cats/show"
  end

  post "/cats" do
    cat = Cat.create(params[:cat])
    redirect "/cats/#{cat.id}"
  end

  get "/cats/:id/edit" do
    @cat = Cat.find(params[:id])
    erb :"cats/edit"
  end

  patch "/cats/:id" do
    cat = Cat.find(params[:id])
    cat.update(params[:cat])
    redirect "/cats/#{cat.id}"
  end

  delete "/cats/:id" do
    cat = Cat.find(params[:id])
    cat.destroy
    redirect "/cats"
  end





end
