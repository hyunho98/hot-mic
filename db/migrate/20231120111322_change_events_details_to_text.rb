class ChangeEventsDetailsToText < ActiveRecord::Migration[6.1]
  def change
    change_column :events, :details, :text
  end
end
