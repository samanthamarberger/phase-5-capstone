class SpecialitiesController < ApplicationController
    def index 
        specialities = Speciality.all
        if specialities
            render json: specialities, status: :ok
        else
            render jon: { error: ["Not authorized"]}, status: :unauthorized
        end
    end
end