import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Membuat user baru
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
    },
  })
  console.log('User created:', user)

  // Mengambil semua users
  const users = await prisma.user.findMany()
  console.log('All users:', users)

  // Membuat post untuk user
  const post = await prisma.post.create({
    data: {
      title: 'My first post',
      content: 'This is my first post using Prisma!',
      authorId: user.id,
    },
  })
  console.log('Post created:', post)

  // Mengambil users dengan posts mereka
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.log('Users with posts:', JSON.stringify(usersWithPosts, null, 2))
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 