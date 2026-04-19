import CartCheckout from '../../components/Cart/CartCheckout'
import CartItem from '../../components/Cart/CartItem'
import { dummyCartItems } from '../../data/dummyData'

const CartPage = () => {
    return (
        <div className="min-h-screen bg-background pb-16" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-gray-900">عربة التسوق</h2>
                    <p className="text-gray-500 mt-2 font-medium">لديك {dummyCartItems.length} عناصر في سلة التسوق</p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Items List */}
                    <div className="w-full lg:w-2/3 xl:w-3/4">
                        {dummyCartItems.map((item, index) => (
                            <CartItem key={index} item={item} />
                        ))}
                    </div>

                    {/* Checkout Summary Sidebar */}
                    <div className="w-full lg:w-1/3 xl:w-1/4 relative">
                        <CartCheckout items={dummyCartItems} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;
