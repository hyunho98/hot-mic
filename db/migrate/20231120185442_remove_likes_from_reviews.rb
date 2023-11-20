class RemoveLikesFromReviews < ActiveRecord::Migration[6.1]
  def change
    remove_column :reviews, :likes
  end
end
