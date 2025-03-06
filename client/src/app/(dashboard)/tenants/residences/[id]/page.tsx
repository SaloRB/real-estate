'use client'

import {
  ArrowDownToLineIcon,
  CheckIcon,
  CreditCardIcon,
  DownloadIcon,
  EditIcon,
  FileTextIcon,
  MailIcon,
  MapPinIcon,
  UserIcon,
} from 'lucide-react'
import { useParams } from 'next/navigation'

import Loading from '@/components/Loading'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  useGetAuthUserQuery,
  useGetLeasesQuery,
  useGetPaymentsQuery,
  useGetPropertyQuery,
} from '@/state/api'
import { Lease, Payment, Property } from '@/types/prismaTypes'
import { cn } from '@/lib/utils'

const ResidencePage = () => {
  const { id } = useParams()
  const { data: authUser } = useGetAuthUserQuery()
  const {
    data: property,
    isLoading: propertyLoading,
    error: propertyError,
  } = useGetPropertyQuery(Number(id))

  const { data: leases, isLoading: leasesLoading } = useGetLeasesQuery(
    parseInt(authUser?.cognitoInfo?.userId || '0'),
    { skip: !authUser?.cognitoInfo?.userId }
  )

  const { data: payments, isLoading: paymentsLoading } = useGetPaymentsQuery(
    leases?.[0]?.id || 0,
    { skip: !leases?.[0]?.id }
  )

  if (propertyLoading || leasesLoading || paymentsLoading) return <Loading />
  if (!property || propertyError) return <div>Error loading property</div>

  const currentLease = leases?.find((lease) => lease.propertyId === property.id)

  return (
    <div className="dashboard-container">
      <div className="w-full mx-auto">
        <div className="flex flex-col xl:flex-row gap-10">
          {currentLease && (
            <ResidenceCard property={property} currentLease={currentLease} />
          )}
          <PaymentMethod />
        </div>
        <BillingHistory payments={payments || []} />
      </div>
    </div>
  )
}

const ResidenceCard = ({
  property,
  currentLease,
}: {
  property: Property
  currentLease: Lease
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 flex-[2] flex flex-col justify-between">
      {/* Header */}
      <div className="flex gap-5">
        <div className="w-64 h-32 bg-slate-500 object-cover rounded-xl" />
        <div className="flex flex-col justify-between">
          <div>
            <div className="bg-green-500 w-fit text-white px-4 py-1 rounded-full text-sm font-semibold">
              Active Leases
            </div>

            <h2 className="text-2xl font-bold my-2">{property.name}</h2>
            <div className="flex items-center mb-2">
              <MapPinIcon className="size-5 mr-1" />
              <span>
                {property.location.city}, {property.location.state}
              </span>
            </div>
          </div>
          <div className="text-xl font-bold">
            ${currentLease.rent} <span>/ night</span>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div>
        <hr className="my-4" />
        <div className="flex justify-between items-center">
          <div className="xl:flex">
            <div className="text-gray-500 mr-2">Start Date: </div>
            <div className="font-semibold">
              {new Date(currentLease.startDate).toLocaleDateString()}
            </div>
          </div>
          <div className="border-[0.5px] h-4 border-primary-300" />
          <div className="xl:flex">
            <div className="text-gray-500 mr-2">End Date: </div>
            <div className="font-semibold">
              {new Date(currentLease.endDate).toLocaleDateString()}
            </div>
          </div>
          <div className="border-[0.5px] h-4 border-primary-300" />
          <div className="xl:flex">
            <div className="text-gray-500 mr-2">Next Payment: </div>
            <div className="font-semibold">
              {new Date(currentLease.endDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        <hr className="my-4" />
      </div>
      {/* Buttons */}
      <div className="flex justify-end gap-2 w-full">
        <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50 transition-colors duration-300">
          <UserIcon className="size-5 mr-2" /> Manager
        </button>
        <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50 transition-colors duration-300">
          <DownloadIcon className="size-5 mr-2" /> Download Agreement
        </button>
      </div>
    </div>
  )
}

const PaymentMethod = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 flex-1">
      <h2 className="text-2xl font-bold mb-4">Payment method</h2>
      <p className="mb-4">Change how you pay for your plan.</p>
      <div className="border rounded-lg p-6">
        <div>
          <div>
            {/* CardInfo */}
            <div className="flex gap-10">
              <div className="w-36 h-20 bg-blue-600 flex items-center justify-center rounded-md">
                <span className="text-white text-2xl font-bold">VISA</span>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-5">
                    <h3 className="text-lg font-semibold">
                      Visa ending in 2024
                    </h3>
                    <span className="text-sm font-medium border border-primary-700 text-primary-700 px-3 py-1 rounded-full">
                      Default
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <CreditCardIcon className="size-4 mr-1" />
                    <span>Expiry • 26/06/2024</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <MailIcon className="size-4 mr-1" />
                  <span>billing@baseclub.com</span>
                </div>
              </div>
            </div>

            <hr className="my-4" />
            <div className="flex justify-end">
              <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50">
                <EditIcon className="size-5 mr-2" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BillingHistory = ({ payments }: { payments: Payment[] }) => {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">Billing History</h2>
          <p className="text-sm text-gray-500">
            Download your previous plan receipts and usage details.
          </p>
        </div>
        <div>
          <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50 ">
            <DownloadIcon className="size-5 mr-2" />
            <span>Download All</span>
          </button>
        </div>
      </div>
      <hr className="mt-4 mb-1" />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Billing Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id} className="h-16">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <FileTextIcon className="size-4 mr-2" />
                    Invoice #{payment.id} -{' '}
                    {new Date(payment.paymentDate).toLocaleString('default', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'px-2 py-1 rounded-full text-xs font-semibold border',
                      payment.paymentStatus === 'Paid'
                        ? 'bg-green-100 text-green-800 border-green-300'
                        : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                    )}
                  >
                    {payment.paymentStatus === 'Paid' ? (
                      <CheckIcon className="size-4 inline-block mr-1" />
                    ) : null}{' '}
                    {payment.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </TableCell>
                <TableCell>${payment.amountPaid.toFixed(2)}</TableCell>
                <TableCell>
                  <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center font-semibold hover:bg-primary-700 hover:text-primary-50">
                    <ArrowDownToLineIcon className="size-4 mr-1" /> Download
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ResidencePage
