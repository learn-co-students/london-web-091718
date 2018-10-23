Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :edit, :update]

  # create the user
  get "/signup", to: 'users#new', as: 'signup'

  # session functionality
  get "/login",     to: 'sessions#new',     as: 'login'
  post "/sessions", to: "sessions#create",  as: 'sessions'
  post "/logout",   to: "sessions#destroy", as: 'logout'

end
