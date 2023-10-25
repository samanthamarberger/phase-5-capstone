class SpecialitySerializer < ActiveModel::Serializer 
    attributes :id, :name, :picture, :description

    has_many :trainers 
end