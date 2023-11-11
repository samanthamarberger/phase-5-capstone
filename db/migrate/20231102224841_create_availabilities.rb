class CreateAvailabilities < ActiveRecord::Migration[6.1]
  def change
    create_table :availabilities do |t|
      t.integer :trainer_id
      t.datetime :start
      t.datetime :end

      t.timestamps
    end
  end
end
