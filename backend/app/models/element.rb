class Element < ApplicationRecord
  belongs_to :category
  belongs_to :period
  belongs_to :group
  has_many :details
end
