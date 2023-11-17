class ChangeReviewsContentToText < ActiveRecord::Migration[6.1]
  def change
    change_column :reviews, :content, :text
  end
end
