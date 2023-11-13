class AvailabilitySerializer < ActiveModel::Serializer 
    attributes :id, :start, :end
    
    belongs_to :trainer
end