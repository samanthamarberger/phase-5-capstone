class SessionsController < ApplicationController
    def client_create 
        client = Client.find_by(username: params[:username])
        if client&.authenticate(params[:password])
            session[:client_id] = client.id 
            render json: client, status: :created
        else 
            render json: {errors : ["Invalid username or password"], ["Are you logging as a client or trainer?"]}, status: :unauthorized 
        end
    end

end