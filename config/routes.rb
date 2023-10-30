Rails.application.routes.draw do
    # resources :trails, only: [ :index, :create, :update, :destroy ] do
  #   resources :reviews, only: [ :create, :update, :destroy ]
  # end

  # get '/client_me', to: 'clients#show'
  post '/client_login', to: 'sessions#client_create'
  post 'trainer_login', to: 'sessions#trainer_create'
  post '/client_signup', to: 'clients#create'
  post '/trainer_signup', to: 'trainers#create'
  delete '/logout', to: 'sessions#destroy'
  get '/client_me', to: 'clients#show'
  get '/trainer_me', to: 'trainers#show'
  patch '/client_me', to: 'clients#update'
  get '/speciality_names', to: 'specialities#view_only'

  resources :specialities, only: [:index] 

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
