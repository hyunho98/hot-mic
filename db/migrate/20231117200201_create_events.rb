class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :name
      t.string :details
      t.string :type

      t.timestamps
    end
  end
end
