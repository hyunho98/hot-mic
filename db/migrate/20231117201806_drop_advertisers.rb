class DropAdvertisers < ActiveRecord::Migration[6.1]
  def change
    drop_table :advertisers
  end
end
