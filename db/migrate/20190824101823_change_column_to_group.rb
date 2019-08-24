class ChangeColumnToGroup < ActiveRecord::Migration[5.0]
  def up
    change_column :groups, :name, :string, index: true
    change_column :groups, :name, :string, unique: true
  end

  def down
    change_column :groups, :name, :string
  end
end
