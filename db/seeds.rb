

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

Timeblock.create(start_time: "2019-04-01 08:53", end_time: "2019-04-01 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-02 15:56", end_time: "2019-04-02 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-02 19:56", end_time: "2019-04-03 00:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-03 08:53", end_time: "2019-04-03 10:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-03 15:56", end_time: "2019-04-03 20:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-04 13:56", end_time: "2019-04-05 17:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-04 08:53", end_time: "2019-04-04 11:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-05 15:56", end_time: "2019-04-05 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-06 13:56", end_time: "2019-04-06 17:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-07 08:53", end_time: "2019-04-07 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-08 15:56", end_time: "2019-04-08 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-09 13:56", end_time: "2019-04-09 17:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-10 08:53", end_time: "2019-04-10 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-11 15:56", end_time: "2019-04-11 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-11 13:56", end_time: "2019-04-11 17:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-12 08:53", end_time: "2019-04-12 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-13 15:56", end_time: "2019-04-13 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-14 13:56", end_time: "2019-04-14 17:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-15 08:53", end_time: "2019-04-15 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-15 15:56", end_time: "2019-04-15 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-16 13:56", end_time: "2019-04-16 17:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-16 08:53", end_time: "2019-04-16 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-17 15:56", end_time: "2019-04-17 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-17 13:56", end_time: "2019-04-17 17:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-03-18 08:53", end_time: "2019-04-18 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-19 15:56", end_time: "2019-04-19 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-20 13:56", end_time: "2019-04-20 17:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-20 08:53", end_time: "2019-04-20 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-21 15:56", end_time: "2019-04-21 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-21 13:56", end_time: "2019-04-21 17:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-22 15:56", end_time: "2019-04-22 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-22 13:56", end_time: "2019-04-22 17:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-23 08:53", end_time: "2019-04-23 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-24 15:56", end_time: "2019-04-24 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-25 13:56", end_time: "2019-04-25 17:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-03-27 08:53", end_time: "2019-04-27 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-27 15:56", end_time: "2019-04-27 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-29 13:56", end_time: "2019-04-29 17:55", user_id: 311, task_id: 3)
Timeblock.create(start_time: "2019-04-29 08:53", end_time: "2019-04-29 09:55", user_id: 311, task_id: 1)
Timeblock.create(start_time: "2019-04-30 15:56", end_time: "2019-04-30 18:55", user_id: 311, task_id: 2)
Timeblock.create(start_time: "2019-04-30 13:56", end_time: "2019-04-30 17:55", user_id: 311, task_id: 3)

Timeblock.create(start_time: "2019-04-01 02:53", end_time: "2019-04-01 09:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-02 02:56", end_time: "2019-04-02 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-02 02:56", end_time: "2019-04-03 00:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-04-03 02:53", end_time: "2019-04-03 10:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-03 02:56", end_time: "2019-04-03 20:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-04 02:56", end_time: "2019-04-05 17:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-04-04 02:53", end_time: "2019-04-04 11:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-05 02:56", end_time: "2019-04-05 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-06 02:56", end_time: "2019-04-06 17:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-04-07 02:53", end_time: "2019-04-07 09:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-08 02:56", end_time: "2019-04-08 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-09 02:56", end_time: "2019-04-09 17:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-04-10 02:53", end_time: "2019-04-10 09:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-11 02:56", end_time: "2019-04-11 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-11 02:56", end_time: "2019-04-11 17:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-04-12 02:53", end_time: "2019-04-12 09:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-13 02:56", end_time: "2019-04-13 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-14 02:56", end_time: "2019-04-14 17:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-04-15 02:53", end_time: "2019-04-15 09:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-15 02:56", end_time: "2019-04-15 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-16 02:56", end_time: "2019-04-16 17:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-04-16 02:53", end_time: "2019-04-16 09:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-17 02:56", end_time: "2019-04-17 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-17 02:56", end_time: "2019-04-17 17:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-03-18 02:53", end_time: "2019-04-18 09:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-19 02:56", end_time: "2019-04-19 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-20 02:56", end_time: "2019-04-20 17:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-04-20 02:53", end_time: "2019-04-20 09:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-21 02:56", end_time: "2019-04-21 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-21 02:56", end_time: "2019-04-21 17:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-04-22 02:56", end_time: "2019-04-22 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-22 02:56", end_time: "2019-04-22 17:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-04-23 02:53", end_time: "2019-04-23 09:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-24 02:56", end_time: "2019-04-24 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-25 02:56", end_time: "2019-04-25 17:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-03-27 02:53", end_time: "2019-04-27 09:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-27 02:56", end_time: "2019-04-27 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-29 02:56", end_time: "2019-04-29 17:55", user_id: 1, task_id: 3)
Timeblock.create(start_time: "2019-04-29 02:53", end_time: "2019-04-29 09:55", user_id: 1, task_id: 1)
Timeblock.create(start_time: "2019-04-30 02:56", end_time: "2019-04-30 18:55", user_id: 1, task_id: 2)
Timeblock.create(start_time: "2019-04-30 02:56", end_time: "2019-04-30 17:55", user_id: 1, task_id: 3)

Timeblock.create(start_time: "2019-04-01 05:53", end_time: "2019-04-01 09:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-05 05:56", end_time: "2019-04-05 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-03 05:56", end_time: "2019-04-03 00:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-04-03 05:53", end_time: "2019-04-03 10:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-03 05:56", end_time: "2019-04-03 20:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-04 05:56", end_time: "2019-04-05 17:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-04-04 05:53", end_time: "2019-04-04 11:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-05 05:56", end_time: "2019-04-05 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-06 05:56", end_time: "2019-04-06 17:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-04-07 05:53", end_time: "2019-04-07 09:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-08 05:56", end_time: "2019-04-08 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-09 05:56", end_time: "2019-04-09 17:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-04-10 05:53", end_time: "2019-04-10 09:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-11 05:56", end_time: "2019-04-11 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-11 05:56", end_time: "2019-04-11 17:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-04-12 05:53", end_time: "2019-04-12 09:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-13 05:56", end_time: "2019-04-13 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-14 05:56", end_time: "2019-04-14 17:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-04-15 05:53", end_time: "2019-04-15 09:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-15 05:56", end_time: "2019-04-15 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-16 05:56", end_time: "2019-04-16 17:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-04-16 05:53", end_time: "2019-04-16 09:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-17 05:56", end_time: "2019-04-17 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-17 05:56", end_time: "2019-04-17 17:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-03-18 05:53", end_time: "2019-04-18 09:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-19 05:56", end_time: "2019-04-19 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-20 05:56", end_time: "2019-04-20 17:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-04-20 05:53", end_time: "2019-04-20 09:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-21 05:56", end_time: "2019-04-21 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-21 05:56", end_time: "2019-04-21 17:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-04-22 05:56", end_time: "2019-04-22 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-22 05:56", end_time: "2019-04-22 17:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-04-23 05:53", end_time: "2019-04-23 09:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-24 05:56", end_time: "2019-04-24 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-25 05:56", end_time: "2019-04-25 17:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-03-27 05:53", end_time: "2019-04-27 09:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-27 05:56", end_time: "2019-04-27 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-29 05:56", end_time: "2019-04-29 17:55", user_id: 2, task_id: 3)
Timeblock.create(start_time: "2019-04-29 05:53", end_time: "2019-04-29 09:55", user_id: 2, task_id: 1)
Timeblock.create(start_time: "2019-04-30 05:56", end_time: "2019-04-30 18:55", user_id: 2, task_id: 2)
Timeblock.create(start_time: "2019-04-30 05:56", end_time: "2019-04-30 17:55", user_id: 2, task_id: 3)


puts "Data Seeded!"
