class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:client_create, :trainer_create]

    def client_create 
        client = Client.find_by(username: params[:username])
        if client&.authenticate(params[:password])
            session[:id] = client.id 
            session[:role] = "Client"
            render json: client, status: :created
        else 
            render json: { errors: ["Invalid username or password", "Are you a trainer?"] }, status: :unauthorized
        end
    end

    def trainer_create 
        trainer = Trainer.find_by(username: params[:username])
        if trainer&.authenticate(params[:password])
            session[:id] = trainer.id
            session[:role] = "Trainer"
            render json: trainer, status: :created
        else
            render json: { errors: ["Invalid username or password", "Are you a client?"] }, status: :unauthorized
        end
    end

    def destroy
        session.clear  
    end

end