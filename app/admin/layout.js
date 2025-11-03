import AdminNav from '@/components/admin/AdminNav'
import QueryProvider from '@/components/admin/QueryProvider'
import Toaster from '@/components/admin/Toaster'

export const metadata = {
  title: 'Admin Panel - Get Exposure',
  description: 'Content management system',
}

export default function AdminLayout({ children }) {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-black">
        <AdminNav />
        
        {/* Main content area */}
        <main className="lg:pl-64 pt-16 lg:pt-0">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>

        <Toaster />
      </div>
    </QueryProvider>
  )
}

