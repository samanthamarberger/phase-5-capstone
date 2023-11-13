class Appointment < ApplicationRecord
    belongs_to :client
    belongs_to :trainer

    validates :start, :end, presence: true, uniqueness: true
    validates :trainer_id, presence: true
end
