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
end