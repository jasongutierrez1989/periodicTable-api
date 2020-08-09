class Detail < ApplicationRecord
  belongs_to :element, optional: true
  belongs_to :category, optional: true
  belongs_to :period, optional: true
  belongs_to :group, optional: true
end
