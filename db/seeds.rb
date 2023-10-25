# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Seed data for Specialities
Speciality.create(name: 'Speed Training', picture: 'https://simplifaster.com/wp-content/uploads/2017/10/Male-Sprinter-Block-Start.jpg', description: 'Speed Training involves the increase in muscle power through both speed, technical guidance and increased range of motion. As athletes enter each stage of Speed Training, the exercises and drills become easier with greater explosive force behind each repetition.')
Speciality.create(name: 'Weightlifting', picture: 'https://www.powerhouse-fitness.co.uk/blog/wp-content/uploads/2020/12/Blog_olympic_weightlifting-7.jpg', description: 'Weightlifting is an athletic discipline which requires lifting of heavy weights in a progressive manner. It not only tests the physical prowess of an individual but also his/her rate of force generation, i.e., ballistic actions of lifting the weights in minimum amount of time.')
Speciality.create(name: 'Boxing', picture: 'https://www.shape.com/thmb/juZ1SfooOdjIq6zvXgmsoYRp8Rc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/boxing-8fa6221ec7ad4a80ba1e730eb9d1c507.jpg', description: 'Boxing is a combat sport and a martial art in which two people, usually wearing protective gloves and other protective equipment such as hand wraps and mouthguards, throw punches at each other for a predetermined amount of time in a boxing ring.')
Speciality.create(name: 'Pilates', picture: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/04/pilates-machine-reformer-1296x728-header.jpg?w=1155&h=1528', description: 'Pilates is a low-intensity muscle-strengthening workout that focuses heavily on building strong core muscles. Stocksy. Pilates — once a niche strength, mobility, and recovery technique for dancers — has gone mainstream. The low-intensity, muscle-strengthening workout can promote flexibility, mobility, and posture.')

# Seed data for Clients (inherits from User)
Client.create(username: 'client1', name: 'Ashley', password: 'password1', email: "ashley@gmail.com", birthday: "11/08/2000", image: 'https://st3.depositphotos.com/1007566/13175/v/450/depositphotos_131750410-stock-illustration-woman-female-avatar-character.jpg', goals: 'Get faster')
Client.create(username: 'client2', name: 'Eli', password: 'password2', email: "eli@gmail.com", birthday: "02/02/1999", image: 'https://www.creativefabrica.com/wp-content/uploads/2023/01/30/Bearded-Man-Avatar-Icon-Graphics-59392089-1.jpg', goals: 'Gain muscle')

# Seed data for Trainers (inherits from User)
Trainer.create(username: 'trainer1', name: 'Mike', password: 'password3', email: "mike@gmail.com", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPEx2sJPDDumsWYHHFaKSwZGFjEXQU-yTaHw&usqp=CAU', bio: "I ran competitively in college and loved it so much I wanted to teach others.", speciality_id: 1, location: '5662 Cougar Ln, Kearns, UT 84118')
Trainer.create(username: 'trainer2', name: 'Hannah', password: 'password4', email: "hannah@gmail.com", image: 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2018/06/08/19c9192c-24d3-40ac-984a-cf0385d9bb65/morghan-king-three-time-champion', bio: "I have been lifting weights for 10 years now and I love it.", speciality_id: 2, location: '710 S Utah Valley Dr, American Fork, UT 84003')

# Seed data for Appointments
Appointment.create(client_id: 1, trainer_id: 1, date: '2023-10-25', time: '10:00:00', duration: '01:00:00')
Appointment.create(client_id: 2, trainer_id: 2, date: '2023-10-26', time: '15:30:00', duration: '01:30:00')