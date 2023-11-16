
ActiveRecord::Schema.define(version: 2023_11_02_224841) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.integer "client_id"
    t.integer "trainer_id"
    t.datetime "start"
    t.datetime "end"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "availabilities", force: :cascade do |t|
    t.integer "trainer_id"
    t.datetime "start"
    t.datetime "end"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "clients", force: :cascade do |t|
    t.string "username"
    t.string "name"
    t.string "password_digest"
    t.string "email"
    t.date "birthday"
    t.string "image"
    t.string "goals"
    t.string "status", default: "Client"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "specialities", force: :cascade do |t|
    t.string "name"
    t.string "picture"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "trainers", force: :cascade do |t|
    t.string "username"
    t.string "name"
    t.string "password_digest"
    t.string "email"
    t.string "image"
    t.string "bio"
    t.integer "speciality_id"
    t.string "location"
    t.string "status", default: "Trainer"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
