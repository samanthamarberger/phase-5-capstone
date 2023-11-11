class TrainerSerializer < ActiveModel::Serializer 
    attributes :id, :username, :name, :email, :image, :bio, :speciality_id, :location, :status, :speciality, :availabilities


    def speciality 
        Speciality.find(object.speciality_id).name
    end

    has_many :appointments
    has_many :availabilities
    has_many :clients
end