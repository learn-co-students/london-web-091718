class HumansController < ApplicationController

  get "/humans" do
    @humans = Human.all
    erb :"humans/index"
  end

  get "/humans/new" do
    @cats = Cat.all
    erb :"humans/new"
  end

  get "/humans/:id" do
    @human = Human.find(params[:id])
    erb :"humans/show"
  end

  post "/humans" do
    human = Human.create(params[:human])
    redirect "/humans/#{human.id}"
  end

  get "/humans/:id/edit" do
    @cats = Cat.all
    @human = Human.find(params[:id])
    erb :"humans/edit"
  end

  patch "/humans/:id" do
    human = Human.find(params[:id])
    human.update(params[:human])
    redirect "/humans/#{human.id}"
  end

  delete "/humans/:id" do
    human = Human.find(params[:id])
    human.destroy
    redirect "/humans"
  end
end
