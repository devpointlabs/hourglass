class Project < ApplicationRecord
  has_many :users, through: :assignments
  
end
