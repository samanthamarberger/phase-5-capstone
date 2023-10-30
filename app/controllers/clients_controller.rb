class ClientsController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def show
        client = Client.find_by(id: session[:id])
        if session[:role] == "Client"
            render json: client, status: :ok
        else
            render json: { error: "Not Authorized" }, status: :unauthorized
        end
    end

    def create
        client = Client.create(client_params)
        if client.valid?
            session[:id] = client.id
            session[:role] = client.status
            render json: client, status: :created
        else 
            render json: { errors: client.errors.full_messages }, status: :unprocessable_entity
        end 
    end

    def update
        client = Client.find_by(id: session[:id])
        client.update(update_client_params)
        if client.valid?
            render json: client, status: :accepted
        else 
            render json: { errors: client.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def client_params
        params.permit(:username, :name, :email, :password, :password_confirmation)
    end

    def update_client_params
        params.permit(:username, :name, :email, :birthday, :image, :goals)
    end
end