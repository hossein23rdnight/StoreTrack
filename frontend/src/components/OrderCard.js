import React from 'react';

const OrderCard = ({ order, onDelete, onUpdateStatus }) => {
    const handleDelete = () => {
        onDelete(order._id);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-400 text-yellow-800';
            case 'Sending':
                return 'bg-blue-400 text-blue-800';
            case 'Complete': 
                return 'bg-green-400 text-green-800';
            case 'Canceled':
                return 'bg-red-400 text-red-800';
            default:
                return 'bg-gray-400 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-bold">Order #{order._id.substring(0, 8)}...</h2>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                    </span>
                </div>

                <div className="mb-4 border-t pt-2">
                    <h4 className="font-semibold text-sm mb-1">Items:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {order.products.map(item => (
                            item.product ? (
                                <li key={item.product._id}>
                                    {item.product.name} - (Quantity: {item.quantity})
                                </li>
                            ) : (
                                <li key={Math.random()} className="text-red-500">
                                    Product no longer exists
                                </li>
                            )
                        ))}
                    </ul>
                </div>

                <p className="font-bold text-right text-lg">Total: ${order.totalPrice.toFixed(2)}</p>
            </div>
            
            <div className="border-t mt-4 pt-2 flex flex-col space-y-2">
                 <div className='flex space-x-2'>
                    {order.status === 'Pending' && (
                        <button onClick={() => onUpdateStatus(order._id, 'Sending')} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-2 rounded">
                            Mark as Sending
                        </button>
                    )}
                    {order.status === 'Sending' && (
                        <button onClick={() => onUpdateStatus(order._id, 'Complete')} className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-1 px-2 rounded">
                            Mark as Complete
                        </button>
                    )}
                 </div>
                {order.status !== 'Canceled' && order.status !== 'Complete' && (
                    <button onClick={() => onUpdateStatus(order._id, 'Canceled')} className="w-full bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold py-1 px-2 rounded">
                        Cancel Order
                    </button>
                )}
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Delete Order
                </button>
            </div>
        </div>
    );
};

export default OrderCard;
