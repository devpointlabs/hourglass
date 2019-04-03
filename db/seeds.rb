5.times do
  
  @user = User.create(
    name: Faker::Name.name,
    nickname: Faker::Superhero.name,
    email: Faker::Internet.email,
    password: "password",
  )

  2.times do 
    @project = Project.create(
      name: Faker::App.name,
      client_name: Faker::App.author,
      planned_start: Faker::Date.between(20.days.ago, Date.today),
      planned_end:  Faker::Date.between(Date.today, 30.days.from_now),
      notes: Faker::Lorem.paragraph
    )
  end

  Assignment.create(
    user_id: @user.id,
    project_id: @project.id
  )

end

User.create(
  email: "admin@admin.com",
  name: 'Admin',
  nickname: 'the adman',
  password: "password",
  admin: true,
)

puts "Users Seeded!"
