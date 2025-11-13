const CheckoutScreen = ({ menu, onBack }) => {
    const total = useMemo(() => 
        menu.reduce((sum, item) => sum + item.price, 0)
    , [menu]);

    return (
        <div className={`min-h-screen flex flex-col items-center p-4 ${BASE_BG} font-['Inter']`}>
            {/* Top Bar for Checkout */}
            <div className={`w-full max-w-lg p-4 ${ACCENT_RED} rounded-b-xl shadow-lg mb-8 flex justify-between items-center`}>
                <h1 className="text-2xl font-bold text-white">Checkout</h1>
                <button onClick={onBack} className="text-white text-sm font-semibold hover:underline">
                    &larr; Back to Home
                </button>
            </div>

            <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-2xl space-y-4">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center">
                    <ShoppingCart className={`w-5 h-5 mr-2 ${ACCENT_TEXT}`} />
                    Order Summary ({menu.length} items)
                </h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {menu.map(item => (
                        <div key={item.id} className="flex justify-between border-b pb-2">
                            <span className="text-gray-700">{item.name}</span>
                            <span className="font-medium text-gray-800">R{item.price.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="pt-4 border-t-2 border-red-200 flex justify-between font-bold text-2xl">
                    <span className={ACCENT_TEXT}>Total:</span>
                    <span className={ACCENT_TEXT}>R{total.toFixed(2)}</span>
                </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
                This is the simulated checkout screen.
            </p>
        </div>
    );
};


// --- Main App Component ---

const App = () => {
    const [menu, setMenu] = useState(initialMenu);
    const [currentScreen, setCurrentScreen] = useState('Home'); // 'Home', 'Admin', or 'Checkout'

    // Simple navigation handler
    const navigation = useMemo(() => ({
        navigate: (screen) => {
            setCurrentScreen(screen);
        },
    }), []);

    const addMenuItem = (item) => {
        setMenu(prevMenu => [...prevMenu, item]);
    };
    
    const removeMenuItem = (id) => {
        setMenu(prevMenu => prevMenu.filter(item => item.id !== id));
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'Admin':
                return <AdminScreen 
                    menu={menu} 
                    addMenuItem={addMenuItem} 
                    removeMenuItem={removeMenuItem} 
                    onBack={() => setCurrentScreen('Home')}
                />;
            case 'Checkout':
                return <CheckoutScreen menu={menu} onBack={() => setCurrentScreen('Home')} />;
            case 'Home':
            default:
                return <HomeScreen menu={menu} navigation={navigation} />;
        }
    };

    return (
        <div className={`min-h-screen flex justify-center ${BASE_BG}`}>
            {/* Header / Top Circle */}
            <div className={`w-[150vw] h-[250px] ${ACCENT_RED} rounded-b-[50%] absolute top-0 -translate-y-1/2 flex flex-col items-center justify-end pb-12 shadow-lg z-0 transition-all duration-300 ${currentScreen === 'Home' ? 'h-[250px]' : 'h-[100px] pb-4'}`}>
                <Smartphone className={`w-12 h-12 mb-2 ${WHITE_TEXT} transition-all duration-300 ${currentScreen === 'Home' ? 'scale-100' : 'scale-75 translate-y-12'}`} /> 
                <h1 className={`text-xl font-black ${WHITE_TEXT} text-center w-3/4 transition-all duration-300 ${currentScreen === 'Home' ? 'opacity-100' : 'opacity-0'}`}>
                    Christoffel’s Daily Bite Board
                </h1>
            </div>

            {/* Content Area */}
            <div className={`w-full max-w-lg pt-16 z-10 flex-grow ${BASE_BG}`}>
                {renderScreen()}
            </div>
            
        </div>
    );
}

export default App;