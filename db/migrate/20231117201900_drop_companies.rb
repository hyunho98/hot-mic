class DropCompanies < ActiveRecord::Migration[6.1]
  def change
    drop_table :companies
  end
end
