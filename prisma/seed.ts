import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create a test vendor
  const vendorPassword = await bcrypt.hash('vendorpassword', 10)
  const vendor = await prisma.user.create({
    data: {
      name: 'Test Vendor',
      email: 'vendor@test.com',
      password: vendorPassword,
      userType: 'vendor',
      vendor: {
        create: {
          businessName: 'Test Vendor Business',
          category: 'Food',
          location: 'New York',
          contact: '123-456-7890',
        },
      },
    },
  })

  // Create a test host
  const hostPassword = await bcrypt.hash('hostpassword', 10)
  const host = await prisma.user.create({
    data: {
      name: 'Test Host',
      email: 'host@test.com',
      password: hostPassword,
      userType: 'host',
      host: {
        create: {
          organizationName: 'Test Host Organization',
          contact: '098-765-4321',
        },
      },
    },
  })

  console.log({ vendor, host })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

