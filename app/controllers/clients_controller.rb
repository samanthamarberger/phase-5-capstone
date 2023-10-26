class ClientsController < ApplicationController

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

    private

    def client_params
        params.permit(:username, :email, :password, :password_confirmation)
    end
end