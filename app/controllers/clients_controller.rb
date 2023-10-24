class ClientsController < ApplicationController

    def show
        user = Client.find_by(id: session[:id])
        if user
            render json: user, status: :ok
        else
            render json: { error: "Not Authorized" }, status: :unauthorized
        end
    end
end