import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  Dealer, 
  ServiceBooking, 
  ProductCategory, 
  OrderStatus, 
  ServiceStatus, 
  DealerTier 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_DEALERS, 
  INITIAL_SERVICES 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  activePortal: 'customer' | 'dealer' | 'admin';
  setActivePortal: (portal: 'customer' | 'dealer' | 'admin') => void;
  activeCustomerView: 'shop' | 'advisor' | 'service' | 'tracking' | 'orders';
  setActiveCustomerView: (view: 'shop' | 'advisor' | 'service' | 'tracking' | 'orders') => void;
  
  // Products
  products: Product[];
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  updateProductStock: (id: string, inStock: boolean, count?: number) => void;
  updateProductPrice: (id: string, price: number, origPrice?: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, includeInstallation?: boolean, extendedWarrantyYears?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, quantity: number) => void;
  updateCartItemOptions: (productId: string, options: { includeInstallation?: boolean; extendedWarrantyYears?: number }) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Checkout & Orders
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  recentOrder: Order | null;
  setRecentOrder: (order: Order | null) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingSteps'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Dealers
  dealers: Dealer[];
  currentDealer: Dealer | null;
  setCurrentDealer: (dealer: Dealer | null) => void;
  registerDealer: (dealerData: Omit<Dealer, 'id' | 'tier' | 'status' | 'creditUsed' | 'totalOrdersCount' | 'totalVolumeSpend' | 'joinedDate' | 'wholesaleDiscount' | 'creditLimit'>) => Dealer;
  updateDealerStatus: (dealerId: string, status: 'Approved' | 'Pending' | 'Rejected', tier?: DealerTier, creditLimit?: number, wholesaleDiscount?: number) => void;

  // Services
  serviceBookings: ServiceBooking[];
  bookService: (data: Omit<ServiceBooking, 'id' | 'ticketNumber' | 'status' | 'createdAt'>) => ServiceBooking;
  updateServiceStatus: (id: string, status: ServiceStatus, techName?: string, techPhone?: string) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePortal, setActivePortalState] = useState<'customer' | 'dealer' | 'admin'>('customer');
  const [activeCustomerView, setActiveCustomerView] = useState<'shop' | 'advisor' | 'service' | 'tracking' | 'orders'>('shop');
  
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('califnco_products');
    if (!saved) return INITIAL_PRODUCTS;
    try {
      const parsed: Product[] = JSON.parse(saved);
      return parsed.map((p) => {
        const initial = INITIAL_PRODUCTS.find((init) => init.id === p.id);
        return initial ? { ...p, image: initial.image } : p;
      });
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('califnco_cart');
    if (!saved) return [];
    try {
      const parsed: CartItem[] = JSON.parse(saved);
      return parsed.map((item) => {
        const initial = INITIAL_PRODUCTS.find((init) => init.id === item.product.id);
        return initial ? { ...item, product: { ...item.product, image: initial.image } } : item;
      });
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('califnco_orders');
    if (!saved) return INITIAL_ORDERS;
    try {
      const parsed: Order[] = JSON.parse(saved);
      return parsed.map((order) => ({
        ...order,
        items: order.items.map((item) => {
          const initial = INITIAL_PRODUCTS.find((init) => init.id === item.product.id);
          return initial ? { ...item, product: { ...item.product, image: initial.image } } : item;
        })
      }));
    } catch {
      return INITIAL_ORDERS;
    }
  });
  const [recentOrder, setRecentOrder] = useState<Order | null>(null);

  // Dealers
  const [dealers, setDealers] = useState<Dealer[]>(() => {
    const saved = localStorage.getItem('califnco_dealers');
    return saved ? JSON.parse(saved) : INITIAL_DEALERS;
  });
  // default active demo dealer is the first approved one
  const [currentDealer, setCurrentDealer] = useState<Dealer | null>(INITIAL_DEALERS[0]);

  // Service Bookings
  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>(() => {
    const saved = localStorage.getItem('califnco_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Local storage persistence
  useEffect(() => {
    localStorage.setItem('califnco_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('califnco_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('califnco_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('califnco_dealers', JSON.stringify(dealers));
  }, [dealers]);

  useEffect(() => {
    localStorage.setItem('califnco_services', JSON.stringify(serviceBookings));
  }, [serviceBookings]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setActivePortal = (portal: 'customer' | 'dealer' | 'admin') => {
    setActivePortalState(portal);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart actions
  const addToCart = (
    product: Product, 
    quantity: number = 1, 
    includeInstallation: boolean = true, 
    extendedWarrantyYears: number = 0
  ) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, includeInstallation, extendedWarrantyYears }];
    });
    showToast('Added to Cart', `${product.name} (${quantity} unit) added successfully.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item Removed', 'The item was removed from your cart.', 'info');
  };

  const updateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateCartItemOptions = (
    productId: string, 
    options: { includeInstallation?: boolean; extendedWarrantyYears?: number }
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, ...options } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingSteps'>): Order => {
    const id = 'ord-' + Date.now();
    const orderNum = orderData.isDealerOrder 
      ? `CAL-DLR-${Math.floor(1000 + Math.random() * 9000)}` 
      : `CAL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      trackingSteps: [
        { status: 'Order Placed', description: 'Order recorded and assigned to nearest Califnco hub', timestamp: 'Just now', completed: true, current: false },
        { status: 'Quality Inspected', description: 'Undergoing 24-point TDS and high-pressure membrane leak test', timestamp: 'Pending', completed: false, current: true },
        { status: 'Dispatched', description: 'Scheduled for Califnco Express Logistics transport', timestamp: 'Pending', completed: false, current: false },
        { status: 'Out for Delivery', description: 'Handed over to field technician & delivery team', timestamp: 'Pending', completed: false, current: false },
        { status: 'Doorstep Installation', description: 'Free technician installation & water purity demo', timestamp: 'Pending', completed: false, current: false }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setRecentOrder(newOrder);

    // If dealer order, update dealer credit used and order count
    if (orderData.isDealerOrder && orderData.dealerId) {
      setDealers((prev) =>
        prev.map((d) =>
          d.id === orderData.dealerId
            ? {
                ...d,
                creditUsed: d.creditUsed + (orderData.paymentMethod === 'dealer_credit' ? orderData.total : 0),
                totalOrdersCount: d.totalOrdersCount + 1,
                totalVolumeSpend: d.totalVolumeSpend + orderData.total
              }
            : d
        )
      );
    }

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        
        // update tracking steps
        const stepNames = ['Order Placed', 'Quality Inspected', 'Dispatched', 'Out for Delivery', 'Installed'];
        const targetIdx = 
          status === 'Processing' ? 1 :
          status === 'Dispatched' ? 2 :
          status === 'Out for Delivery' ? 3 :
          status === 'Delivered' || status === 'Installed' ? 4 : 0;

        const updatedSteps = ord.trackingSteps.map((step, idx) => ({
          ...step,
          completed: idx <= targetIdx,
          current: idx === targetIdx
        }));

        return {
          ...ord,
          status,
          trackingSteps: updatedSteps
        };
      })
    );
    showToast('Order Updated', `Order status changed to ${status}.`, 'info');
  };

  // Dealers
  const registerDealer = (dealerData: Omit<Dealer, 'id' | 'tier' | 'status' | 'creditUsed' | 'totalOrdersCount' | 'totalVolumeSpend' | 'joinedDate' | 'wholesaleDiscount' | 'creditLimit'>): Dealer => {
    const newDealer: Dealer = {
      ...dealerData,
      id: 'dlr-' + Date.now().toString().slice(-4),
      tier: 'Silver Partner',
      status: 'Pending',
      wholesaleDiscount: 25,
      creditLimit: 150000,
      creditUsed: 0,
      totalOrdersCount: 0,
      totalVolumeSpend: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setDealers((prev) => [newDealer, ...prev]);
    showToast('Application Submitted', 'Your dealership request is submitted. Califnco B2B team will review within 24 hours.', 'success');
    return newDealer;
  };

  const updateDealerStatus = (
    dealerId: string, 
    status: 'Approved' | 'Pending' | 'Rejected', 
    tier?: DealerTier, 
    creditLimit?: number, 
    wholesaleDiscount?: number
  ) => {
    setDealers((prev) =>
      prev.map((d) =>
        d.id === dealerId
          ? {
              ...d,
              status,
              ...(tier ? { tier } : {}),
              ...(creditLimit !== undefined ? { creditLimit } : {}),
              ...(wholesaleDiscount !== undefined ? { wholesaleDiscount } : {})
            }
          : d
      )
    );
    showToast('Dealer Profile Updated', `Dealer marked as ${status}.`, 'info');
  };

  // Service Bookings
  const bookService = (data: Omit<ServiceBooking, 'id' | 'ticketNumber' | 'status' | 'createdAt'>): ServiceBooking => {
    const id = 'srv-' + Date.now();
    const ticketNumber = `SRV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newBooking: ServiceBooking = {
      ...data,
      id,
      ticketNumber,
      status: 'Received',
      createdAt: new Date().toISOString()
    };

    setServiceBookings((prev) => [newBooking, ...prev]);
    showToast('Service Booked!', `Ticket #${ticketNumber} created. A certified technician will call you shortly.`, 'success');
    return newBooking;
  };

  const updateServiceStatus = (id: string, status: ServiceStatus, techName?: string, techPhone?: string) => {
    setServiceBookings((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status,
              ...(techName ? { technicianName: techName } : {}),
              ...(techPhone ? { technicianPhone: techPhone } : {})
            }
          : s
      )
    );
    showToast('Service Ticket Updated', `Ticket status updated to ${status}.`, 'info');
  };

  // Products stock / price
  const updateProductStock = (id: string, inStock: boolean, count?: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              inStock,
              ...(count !== undefined ? { stockCount: count } : {})
            }
          : p
      )
    );
    showToast('Inventory Updated', 'Product stock updated in real time.', 'info');
  };

  const updateProductPrice = (id: string, price: number, origPrice?: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              price,
              ...(origPrice ? { originalPrice: origPrice } : {})
            }
          : p
      )
    );
    showToast('Price Updated', 'Retail catalog price updated.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activePortal,
        setActivePortal,
        activeCustomerView,
        setActiveCustomerView,

        products,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        updateProductStock,
        updateProductPrice,

        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        updateCartItemOptions,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,

        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        recentOrder,
        setRecentOrder,
        placeOrder,
        updateOrderStatus,

        dealers,
        currentDealer,
        setCurrentDealer,
        registerDealer,
        updateDealerStatus,

        serviceBookings,
        bookService,
        updateServiceStatus,

        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
