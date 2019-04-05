class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :assignments
  has_manu :users, through: :assignments
end
