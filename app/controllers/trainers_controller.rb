class TrainersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def show
        user = Trainer.find_by(id: session[:id])
        if session[:role] == "Trainer"
            render json: user, status: :ok
        else
            render json: { error: "Not Authorized" }, status: :unauthorized
        end
    end

    def create
        trainer = Trainer.create(trainer_params)
        if trainer.valid?
            session[:id] = trainer.id
            session[:role] = trainer.status
            render json: trainer, status: :created
        else 
            render json: { errors: trainer.errors.full_messages }, status: :unprocessable_entity
        end 
    end

    def add_speciality
        trainer = Trainer.find_by(id: session[id])
        trainer.update(add_speciality_params)
        if trainer.valid?
            render json: trainer, status: :updated
        else
            render json: { errors: trainer.errors.full_messages }, status: :unprocessable_entity
        end
    end


    private

    def trainer_params
        params.permit(:username, :name, :email, :speciality_id, :password, :password_confirmation)
    end

    def add_speciality_params
        params.permit(:speciality_id)
    end
end