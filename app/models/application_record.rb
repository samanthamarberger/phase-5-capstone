class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def password_required?
    password.present? || password_confirmation.present?
  end
end
