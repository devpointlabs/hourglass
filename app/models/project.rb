class Project < ApplicationRecord
  has_many :users, through: :assignments, dependent: :destroy
  has_many :timeblocks, dependent: :destroy
end
