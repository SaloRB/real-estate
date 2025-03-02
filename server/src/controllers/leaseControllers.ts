import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getLeases = async (req: Request, res: Response): Promise<void> => {
  try {
    const leases = await prisma.lease.findMany({
      include: {
        tenant: true,
        property: true,
      },
    })

    res.json(leases)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res
        .status(400)
        .json({ message: `Error retrieving leases: ${error.message}` })
    }

    res.status(500).json({ message: 'Server Error' })
  }
}

export const getLeasePayments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params

    const payments = await prisma.payment.findMany({
      where: { leaseId: Number(id) },
    })

    res.json(payments)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res
        .status(400)
        .json({ message: `Error retrieving lease payments: ${error.message}` })
    }

    res.status(500).json({ message: 'Server Error' })
  }
}
