class SpecialitiesController < ApplicationController
    def index 
        specialities = Speciality.all
        render json: specialities, status: :ok
    end
end