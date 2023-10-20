class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create]
    
    def client_create 
        client = Client.find_by(username: params[:username])
        if client&.authenticate(params[:password])
            session[:user_id] = client.id 
            render json: client, status: :created
        else 
            render json: {errors : ["Invalid username or password"], ["Are you logging as a client or trainer?"]}, status: :unauthorized 
        end
    end

    def destroy
        session.clear  
    end

end