class Task < ApplicationRecord
  belongs_to :project
  has_many :assignments
  has_many :users, through: :assignments

  has_many :timeblocks, dependent: :destroy

  def self.find_with_hours
  end
end
