class CreateTrainers < ActiveRecord::Migration[6.1]
  def change
    create_table :trainers do |t|
      t.string :username
      t.string :name
      t.string :password_digest
      t.string :email
      t.string :image
      t.string :bio
      t.integer :speciality_id
      t.string :location
      t.string :status, default: "Trainer"

      t.timestamps
    end
  end
end
