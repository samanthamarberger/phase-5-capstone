class Appointment < ApplicationRecord
    belongs_to :client
    belongs_to :trainer

    validates :start, :end, presence: true, uniqueness: { scope: :client_id, message: 'conflicts with a different appointment you have' }
    validates :trainer_id, presence: true
end
