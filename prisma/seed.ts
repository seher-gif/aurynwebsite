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

  // Create references page if it doesn't exist
  await prisma.page.upsert({
    where: { slug: 'referanslar' },
    update: {},
    create: {
      slug: 'referanslar',
      title: 'Referanslar',
      content: 'Müşterilerimiz ve başarı hikayelerimiz.',
      metaTitle: 'Referanslar - Auryn Dijital',
      metaDesc: 'Auryn Dijital olarak çalıştığımız markalar ve başarı hikayelerimiz.',
      published: true,
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
