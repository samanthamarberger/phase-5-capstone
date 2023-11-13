class AvailabilitiesController < ApplicationController

    def index
        availabilities = Availability.all
        render json: availabilities, status: :ok
    end

    def client_delete
        availability = client_trainer.availabilities.find_by(id: params[:availability_id])
        if availability
            availability.destroy
            head :no_content
        else
            render json: { error: 'You do not have permission to delete this review'}, status: :not_found
        end
    end 

    def destroy
        availability = current_trainer.availabilities.find_by(id: params[:id])
        if availability
            availability.destroy
            head :no_content
        else
            render json: { error: 'You do not have permission to delete this review'}, status: :not_found
        end
    end

    private

    def client_trainer
        Trainer.find_by(id: params[:id])
    end

    def current_trainer
        Trainer.find_by(id: session[:id])
    end
end
