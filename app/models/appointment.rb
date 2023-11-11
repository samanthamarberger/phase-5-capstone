class Appointment < ApplicationRecord
    belongs_to :client
    belongs_to :trainer

    validates :trainer_id, :start, :end, presence: true
end
