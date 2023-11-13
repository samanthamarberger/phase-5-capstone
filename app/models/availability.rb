class Availability < ApplicationRecord
    belongs_to :trainer

    validates :start, :end, presence: true, uniqueness: true
end
