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
