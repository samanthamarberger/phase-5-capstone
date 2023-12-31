class Trainer < ApplicationRecord
    has_secure_password
    
    has_many :appointments 
    has_many :availabilities
    has_many :clients, -> { distinct }, through: :appointments
    belongs_to :speciality 

    validates :username, :email, presence: true, uniqueness: true
    validates :name, presence: true
    validates :password, presence: true, if: :password_required?
end
