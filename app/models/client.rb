
class Client < ApplicationRecord
    has_secure_password

    has_many :appointments
    has_many :trainers, through: :appointments

    validates :username, :email, presence: true, uniqueness: true
    validates :password, presence: true, if: :password_required?

    def password_required?
        password.present? || password_confirmation.present?
    end
end
