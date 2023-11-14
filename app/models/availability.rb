class Availability < ApplicationRecord
    belongs_to :trainer

    validates :start, :end, presence: true, uniqueness: { scope: :trainer_id, message: 'has already been reserved by you' }
end
