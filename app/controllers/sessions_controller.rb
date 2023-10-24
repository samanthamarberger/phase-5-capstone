class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:client_create]

    def client_create 
        puts "Recieved request: #{params.inspect}"
        client = Client.find_by(username: params[:username])
        puts "Found client: #{client.inspect}"
        if client&.authenticate(params[:password])
            puts "Authentication successful"
            session[:id] = client.id 
            render json: client, status: :created
        else 
            puts "Authentication failed"
            render json: { errors: ["Invalid username or password", "Are you logging in as a client or trainer?"] }, status: :unauthorized
        end
    end

    def destroy
        session.clear  
    end

end