class ClientSerializer < ActiveModel::serializer 
    attributes :id, :username, :email, :birthday, :image, :goals

    has_many :trainers 
end