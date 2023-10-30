class SpecialitiesController < ApplicationController
    skip_before_action :authorize, only: [:view_only]

    def index 
        specialities = Speciality.all
        if specialities
            render json: specialities, status: :ok
        else
            render jon: { error: ["Not authorized"]}, status: :unauthorized
        end
    end

    def view_only
        specialities = Speciality.pluck(:id, :name)
        render json: specialities, status: :ok
    end

    def create
        speciality = Speciality.create(speciality_params)
        if speciality.valid? 
            render json: speciality, status: :created
        else 
            render json: { errors: speciality.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def speciality_params
        params.permit(:name, :picture, :description)
    end
end