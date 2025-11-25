import bcrypt from 'bcryptjs'
import 'dotenv/config'
import { prisma } from '../src/lib/prisma'

async function main() {
  const email = 'seher@auryndijital.com' // Using 'seher@auryndijital.com' as the login identifier
  const password = '1234'
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Admin User',
      passwordHash: hashedPassword,
      role: 'ADMIN' as any,
    },
  })

  console.log({ user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
