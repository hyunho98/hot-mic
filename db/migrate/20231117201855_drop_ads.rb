class DropAds < ActiveRecord::Migration[6.1]
  def change
    drop_table :ads
  end
end
