class Availability < ApplicationRecord
    belongs_to :trainer

    validates :start, :end, presence: true, uniqueness: { scope: :trainer_id, message: 'has already been reserved by you' }

    validate :start_date_past

    def start_date_past
        errors.add(:start, 'date cannot be in the past') if start.present? && start < Date.today
    end
    
end
