class AvailabilitySerializer < ActiveModel::Serializer 
    attributes :id, :start, :end, :location

    def location
        Trainer.find(object.trainer_id).location
    end
    
    belongs_to :trainer
end