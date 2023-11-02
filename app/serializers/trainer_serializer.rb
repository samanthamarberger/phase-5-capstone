class TrainerSerializer < ActiveModel::Serializer 
    attributes :id, :username, :name, :email, :image, :bio, :speciality_id, :location, :status, :speciality


    def speciality 
        Speciality.find(object.speciality_id).name
    end

    has_many :appointments
    has_many :clients
end