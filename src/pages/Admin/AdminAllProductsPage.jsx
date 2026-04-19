import AdminSideBar from '../../components/Admin/AdminSideBar'
import AdminAddProducts from '../../components/Admin/AdminAddProducts'

const AdminAllProductsPage = () => {
    return (
        <div className="min-h-screen bg-background pb-16" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
               <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4 xl:w-1/5 shrink-0">
                        <AdminSideBar />
                    </div>
                    
                    {/* Content */}
                    <div className="w-full lg:w-3/4 xl:w-4/5">
                        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 min-h-[500px]">
                            <h2 className="text-2xl font-black text-gray-900 mb-6">إضافة منتج جديد</h2>
                            <AdminAddProducts />
                        </div>
                    </div>
               </div>
            </div>
        </div>
    )
}

export default AdminAllProductsPage;
