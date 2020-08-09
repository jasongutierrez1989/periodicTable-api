class CreateDetails < ActiveRecord::Migration[6.0]
  def change
    create_table :details do |t|
      t.string :info
      t.integer :category_id
      t.integer :element_id
      t.integer :group_id
      t.integer :period_id

      t.timestamps
    end
  end
end
