Rails.application.routes.draw do
  resources :users, only: [:index]
  post 'signin', to: 'users#signin'
  get 'validate', to: 'users#validate'
  get 'inventory', to: 'users#get_inventory'
end
