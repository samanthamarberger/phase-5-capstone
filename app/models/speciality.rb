class Speciality < ApplicationRecord
    has_many :trainers 

    validates :name, presence: true, uniqueness: true
    validates :picture, presence: true
end
