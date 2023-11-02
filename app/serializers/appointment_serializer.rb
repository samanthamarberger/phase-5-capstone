class AppointmentSerializer < ActiveModel::Serializer 
    attributes :id, :date, :start, :end, :trainer_name, :title, :client_name

    def trainer_name
        Trainer.find(object.trainer_id).name
    end

    def title
        Trainer.find(object.trainer_id).speciality.name
    end

    def client_name
        Client.find(object.client_id).name
    end

    belongs_to :client
    belongs_to :trainer
end