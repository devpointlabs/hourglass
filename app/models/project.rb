class Project < ApplicationRecord

  has_many :assignments
  has_many :users, through: :assignments 
  has_many :timeblocks
  
end
