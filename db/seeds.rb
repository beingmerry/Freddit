Post.destroy_all
Comment.destroy_all
User.destroy_all
Like.destroy_all
Topic.destroy_all

post1 = Post.create(title: "first post", content: "this is my first post!", num_likes: 1)
post2 = Post.create(title: "second post", content: "This is my second post!", num_likes: 1)
post3 = Post.create(title: "third post", content: "This is my third post!", num_likes: 1)
topics = Topic.create([{name: "Dog Fun"}, {name: "Sports Ball"}])
user1 = User.create(username: "rimoomey", email: "rimon@realsite.com", password: "blEddBloop")
user2 = User.create(username: 'jay', email: 'jj@totallylegit.com', password: 'asdkfahd')
comment1 = Comment.create(content: 'this is a comment', num_likes: 1)
comment2 = Comment.create(content: 'this is a better comment', num_likes: 10)

comment1.user = user1
comment1.post = post1
comment1.save
comment2.user = user2
comment2.post = post1
comment2.save
post1.user = user1
post1.topic = topics[0]
post1.save
post2.user = user2
post2.topic = topics[1]
post2.save
post3.user = user2
post3.topic = topics[0]
post3.save

like = Like.new(vote: -1)
like.likeable = post2
like.user = user1
like.update_likes
like.save
