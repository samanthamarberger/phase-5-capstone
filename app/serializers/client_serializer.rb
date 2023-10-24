class ClientSerializer < ActiveModel::Serializer 
    attributes :id, :username, :name, :email, :birthday, :image, :goals

    has_many :appointments
    has_many :trainers 
end