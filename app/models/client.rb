
class Client < ApplicationRecord
    has_secure_password

    has_many :appointments
    has_many :trainers, -> { distinct }, through: :appointments

    validates :username, :email, presence: true, uniqueness: true
    validates :name, presence: true
    validates :password, presence: true, if: :password_required?

end
