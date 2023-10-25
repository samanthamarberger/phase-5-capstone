class CreateSpecialities < ActiveRecord::Migration[6.1]
  def change
    create_table :specialities do |t|
      t.string :name
      t.string :picture
      t.string :description

      t.timestamps
    end
  end
end
