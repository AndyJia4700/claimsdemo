# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_06_10_221958) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "billing_cpts", force: :cascade do |t|
    t.integer "cpt_id"
    t.text "denied_reason"
    t.boolean "denied", default: false
    t.boolean "approved", default: false
    t.integer "claim_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "modifier1"
    t.string "modifier2"
    t.integer "units"
    t.index ["claim_id"], name: "index_billing_cpts_on_claim_id"
  end

  create_table "billing_icds", force: :cascade do |t|
    t.string "icd_id"
    t.integer "billing_cpt_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["billing_cpt_id"], name: "index_billing_icds_on_billing_cpt_id"
  end

  create_table "claims", force: :cascade do |t|
    t.string "claim_number", null: false
    t.date "claim_date_of_service"
    t.text "message"
    t.integer "patient_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["patient_id"], name: "index_claims_on_patient_id"
  end

  create_table "cpts", force: :cascade do |t|
    t.integer "cpt_code", null: false
    t.text "cpt_description", null: false
    t.integer "billed_amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "icds", force: :cascade do |t|
    t.string "icd_code", null: false
    t.text "icd_description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "patients", force: :cascade do |t|
    t.string "name"
    t.date "birthdate"
    t.string "insurance_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_patients_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "session_token", null: false
    t.string "password_digest", null: false
    t.string "first_name"
    t.string "last_name"
    t.integer "npi"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
