class TrainerSerializer < ActiveModel::Serializer 
    attributes :id, :username, :name, :email, :image, :bio, :speciality_id, :location

    has_many :appointments
    has_many :clients
end