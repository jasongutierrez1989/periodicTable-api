class Group < ApplicationRecord
  has_many :elements
  has_many :details
end
