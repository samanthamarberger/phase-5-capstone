Rails.application.routes.draw do
    # resources :trails, only: [ :index, :create, :update, :destroy ] do
  #   resources :reviews, only: [ :create, :update, :destroy ]
  # end

  # get '/client_me', to: 'clients#show'
  post '/client_login', to: 'sessions#client_create'
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
