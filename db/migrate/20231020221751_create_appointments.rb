class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.integer :client_id
      t.integer :trainer_id
      t.date :date
      t.time :time
      t.time :duration

      t.timestamps
    end
  end
end
