class CreateClients < ActiveRecord::Migration[6.1]
  def change
    create_table :clients do |t|
      t.string :username
      t.string :name
      t.string :password_digest
      t.string :email
      t.date :birthday
      t.string :image
      t.string :goals
      t.string :status, default: "Client"

      t.timestamps
    end
  end
end
