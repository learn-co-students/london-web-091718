Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :customers
  resources :ingredients
  resources :users, only: [:index, :show, :create, :edit, :update, :delete]

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


  # users
  get "/signup", to: 'users#new', as: 'signup'

  # session functionality
  get '/login', to: 'sessions#new', as: 'login'
  post '/sessions', to: 'sessions#create', as: 'sessions'
  post '/logout', to: 'sessions#destroy', as: 'logout'
end
