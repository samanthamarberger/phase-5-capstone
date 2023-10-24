class TrainersController < ApplicationController

    def show
        user = Trainer.find_by(id: session[:id])
        if session[:role] == "Trainer"
            render json: user, status: :ok
        else
            render json: { error: "Not Authorized" }, status: :unauthorized
        end
    end
end