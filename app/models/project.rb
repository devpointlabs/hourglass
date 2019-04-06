class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :assignments
  has_many :users, through: :assignments
end
