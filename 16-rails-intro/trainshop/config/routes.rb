Rails.application.routes.draw do
  resources :trains, only: [:index, :show]


  get 'photos/:id/:user_id', to: 'photos#show'
  get 'daniel/showed/us/rails', to: 'instructors#dan', as: 'dan_page'

end
