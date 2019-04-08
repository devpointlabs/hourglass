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

  Assignment.create(
    user_id: @user.id,
    project_id: @project.id,
  )
end

User.create(
  email: "test@test.com",
  name: "testUser",
  nickname: "Test",
  password: "password",
  admin: false,
)

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
Timeblock.create(start_time: "2019-03-24 08:54", end_time: "2019-03-24 10:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-25 08:55", end_time: "2019-03-25 11:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-26 08:56", end_time: "2019-03-26 12:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-26 08:56", end_time: "2019-03-26 12:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-26 08:56", end_time: "2019-03-26 20:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-27 08:57", end_time: "2019-03-27 13:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-28 08:58", end_time: "2019-03-28 14:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-29 08:59", end_time: "2019-03-29 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-29 08:59", end_time: "2019-03-29 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-01 09:01", end_time: "2019-04-01 15:01", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-02 09:02", end_time: "2019-04-02 14:02", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-03 09:03", end_time: "2019-04-03 15:03", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-04 09:03", end_time: "2019-04-04 15:04", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-04 09:03", end_time: "2019-04-04 15:04", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-04 09:03", end_time: "2019-04-04 15:04", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-23 08:53", end_time: "2019-03-23 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-24 08:54", end_time: "2019-03-24 10:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-25 08:55", end_time: "2019-03-25 11:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-26 08:56", end_time: "2019-03-26 12:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-26 08:56", end_time: "2019-03-26 12:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-26 08:56", end_time: "2019-03-26 20:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-27 08:57", end_time: "2019-03-27 13:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-28 08:58", end_time: "2019-03-28 14:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-29 08:59", end_time: "2019-03-29 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-29 08:59", end_time: "2019-03-29 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-01 09:01", end_time: "2019-04-01 15:01", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-02 09:02", end_time: "2019-04-02 14:02", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-03 09:03", end_time: "2019-04-03 15:03", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-04 09:03", end_time: "2019-04-04 15:04", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-04 09:03", end_time: "2019-04-04 15:04", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-04 09:03", end_time: "2019-04-04 15:04", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-03-23 08:53", end_time: "2019-03-23 09:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-03-24 08:54", end_time: "2019-03-24 10:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-03-25 08:55", end_time: "2019-03-25 11:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-03-26 08:56", end_time: "2019-03-26 12:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-03-26 08:56", end_time: "2019-03-26 12:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-03-26 08:56", end_time: "2019-03-26 20:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-03-27 08:57", end_time: "2019-03-27 13:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-03-28 08:58", end_time: "2019-03-28 14:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-29 08:59", end_time: "2019-03-29 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-29 08:59", end_time: "2019-03-29 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-01 09:01", end_time: "2019-04-01 15:01", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-02 09:02", end_time: "2019-04-02 14:02", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-03 09:03", end_time: "2019-04-03 15:03", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-04 09:03", end_time: "2019-04-04 15:04", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-04 09:03", end_time: "2019-04-04 15:04", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-04 09:03", end_time: "2019-04-04 15:04", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-23 08:53", end_time: "2019-03-23 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-24 08:54", end_time: "2019-03-24 10:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-25 08:55", end_time: "2019-03-25 11:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-26 08:56", end_time: "2019-03-26 12:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-03-26 08:56", end_time: "2019-03-26 12:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-03-26 08:56", end_time: "2019-03-26 20:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-03-27 08:57", end_time: "2019-03-27 13:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-03-28 08:58", end_time: "2019-03-28 14:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-03-29 08:59", end_time: "2019-03-29 09:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-03-29 08:59", end_time: "2019-03-29 09:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-01 09:01", end_time: "2019-04-01 15:01", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-02 09:02", end_time: "2019-04-02 14:02", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-03 09:03", end_time: "2019-04-03 15:03", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-04 09:03", end_time: "2019-04-04 15:04", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-04 09:03", end_time: "2019-04-04 15:04", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-04 09:03", end_time: "2019-04-04 15:04", user_id: 311, task_id: 2)

puts "Data Seeded!"
