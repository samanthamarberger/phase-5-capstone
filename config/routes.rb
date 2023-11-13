Rails.application.routes.draw do

  # get '/client_me', to: 'clients#show'
  post '/client_login', to: 'sessions#client_create'
  post 'trainer_login', to: 'sessions#trainer_create'
  post '/client_signup', to: 'clients#create'
  post '/trainer_signup', to: 'trainers#create'
  delete '/logout', to: 'sessions#destroy'
  get '/client_me', to: 'clients#show'
  get '/trainer_me', to: 'trainers#show'
  patch '/client_me', to: 'clients#update'
  patch '/trainer_me', to: 'trainers#update'
  get '/speciality_names', to: 'specialities#view_only'

  resources :specialities, only: [:index, :create] 
  resources :appointments, only: [:create, :destroy]

  resources :trainers do 
    resources :availabilities, only: [:index]
    delete 'availabilities/:availability_id', to: 'availabilities#client_delete', on: :member, as: 'delete_availability'
  end

  resources :availabilities, only: [:destroy, :create]

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
