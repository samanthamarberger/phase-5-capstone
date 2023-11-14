class AppointmentSerializer < ActiveModel::Serializer 
    attributes :id, :start, :end, :trainer_name, :title, :client_name, :location

    def trainer_name
        Trainer.find(object.trainer_id).name
    end

    def title
        Trainer.find(object.trainer_id).speciality.name
    end

    def client_name
        Client.find(object.client_id).name
    end

    def location
        Trainer.find(object.trainer_id).location
    end

    belongs_to :client
    belongs_to :trainer
end