Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :customers
  resources :ingredients

  # 7 restful routes
  # verb route to: controller#method alias
  # create
  get '/cupcakes/new', to: 'cupcakes#new', as: 'new_cupcake'
  post '/cupcakes', to: 'cupcakes#create'

  # read
  get '/cupcakes', to: 'cupcakes#index'
  get '/cupcakes/:id', to: 'cupcakes#show', as: 'cupcake'

  # update
  get '/cupcakes/:id/edit', to: 'cupcakes#edit', as: 'edit_cupcake'
  patch '/cupcakes/:id', to: 'cupcakes#update'

  # delete
  delete '/cupcakes/:id', to: 'cupcakes#destroy'
end
