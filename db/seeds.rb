5.times do
  User.create(
    name: Faker::Name.name,
    nickname: Faker::Superhero.name,
    email: Faker::Internet.email,
    password: "password",
    image: Faker::Avatar.image("my-own-slug"),
  )
end

5.times do
  User.create(
    name: Faker::FunnyName.name,
    nickname: Faker::GreekPhilosophers.name,
    email: Faker::Internet.email,
    password: "password",
    image: Faker::Avatar.image("my-own-slug"),
    admin: true,
  )
end

User.create(
  email: "admin@admin.com",
  password: "password",
  admin: true,
)

puts "Users Seeded!"
