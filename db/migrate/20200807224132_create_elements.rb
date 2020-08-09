class CreateElements < ActiveRecord::Migration[6.0]
  def change
    create_table :elements do |t|
      t.string :name
      t.string :symbol
      t.integer :atomic_number
      t.float :weight
      t.integer :category_id
      t.integer :period_id
      t.integer :group_id

      t.timestamps
    end
  end
end
