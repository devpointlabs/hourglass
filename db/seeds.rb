5.times do
  @user = User.create(
    name: Faker::Name.name,
    nickname: Faker::Superhero.name,
    email: Faker::Internet.email,
    password: "password",
    image: Faker::Avatar.image,
  )

  2.times do
    @project = Project.create(
      name: Faker::App.name,
      client_name: Faker::App.author,
      planned_start: Faker::Date.between(20.days.ago, Date.today),
      planned_end: Faker::Date.between(Date.today, 30.days.from_now),
      notes: Faker::Lorem.paragraph,
    )
    @task = Task.create(
      name: Faker::Marketing.buzzwords,
      description: Faker::Quotes::Shakespeare.hamlet_quote,
      billable: Faker::Boolean.boolean,
      price_per_hour: Faker::Commerce.price,
      project_id: @project.id,
    )
  end

  Timeblock.create(
    start_time: Faker::Date.between(1.week.ago, 2.days.from_now),
    end_time: Faker::Date.between(2.days.from_now, 2.weeks.from_now),
    user_id: @user.id,
    task_id: @task.id
  )

  Assignment.create(
    user_id: @user.id,
    project_id: @project.id,
  )
end

User.create(
  id: 311,
  email: "admin@admin.com",
  name: "Admin",
  nickname: "The Adman",
  password: "password",
  admin: true,
)

Assignment.create(user_id: 311, project_id: 1)
Assignment.create(user_id: 311, project_id: 2)
Assignment.create(user_id: 311, project_id: 3)

Timeblock.create(start_time: "2019-03-23 08:53", end_time: "2019-03-23 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-09 15:56", end_time: "2019-04-09 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-09 13:56", end_time: "2019-04-09 17:55", user_id: 311, task_id: 3)


puts "Data Seeded!"
