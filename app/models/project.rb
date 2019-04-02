class Project < ApplicationRecord
  has_many :users, through: :assignments dependent: :destroy
  
end
