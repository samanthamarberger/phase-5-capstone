class Speciality < ApplicationRecord
    has_many :trainers 

    validates :name, presence: true, uniqueness: true
    validates :picture, :description, presence: true
end
