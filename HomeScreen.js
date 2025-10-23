import React, { useState, useMemo } from 'react';
import { ShoppingCart, Utensils, Trash2, PlusCircle, MinusCircle, LayoutList } from 'lucide-react';

// --- Theme Simulation ---
// Mapping React Native styles to Tailwind classes
const ACCENT_RED = 'bg-red-700';
const ACCENT_TEXT = 'text-red-700';
const WHITE_TEXT = 'text-white';
const BASE_BG = 'bg-gray-50';

// --- Simulated Data and Components ---

// Simplified Menu Item Structure
const initialMenu = [
    { id: '1', name: 'Signature Pasta', price: 120.00, description: 'Creamy tomato-based pasta with fresh basil.' },
    { id: '2', name: 'Prawn Cocktail', price: 85.50, description: 'Classic starter with plump prawns and house sauce.' },
    { id: '3', name: 'Chocolate Fondant', price: 95.00, description: 'Warm, gooey chocolate dessert with vanilla ice cream.' },
];

/**
 * Simulates the AddMenuForm component for the preview.
 */
const AddMenuForm = ({ addMenuItem, clearMenu, menu }) => {
    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('0.00');

    const handleAdd = () => {
        if (newItemName.trim() && parseFloat(newItemPrice) > 0) {
            addMenuItem({
                id: crypto.randomUUID(),
                name: newItemName.trim(),
                price: parseFloat(newItemPrice),
                description: "Simulated item added by user.",
            });
            setNewItemName('');
            setNewItemPrice('0.00');
        }
    };

    return (
        <div className="w-full max-w-lg p-5 bg-white rounded-xl shadow-xl mt-16 z-10 space-y-3 border border-red-100">
            <h3 className="text-lg font-bold text-gray-800 flex items-center mb-2">
                <PlusCircle className={`w-5 h-5 mr-2 ${ACCENT_TEXT}`} />
                Add Menu Item (Simulated)
            </h3>
            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="Dish Name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className="w-24 p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-right"
                />
            </div>
            <div className="flex space-x-2 pt-2">
                <button
                    onClick={handleAdd}
                    className={`flex-1 py-2 ${ACCENT_RED} ${WHITE_TEXT} font-semibold rounded-lg shadow-md transition hover:bg-red-800`}
                >
                    Add Dish
                </button>
                <button
                    onClick={clearMenu}
                    disabled={menu.length === 0}
                    className="py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md transition hover:bg-gray-300 disabled:opacity-50"
                >
                    <Trash2 className="w-5 h-5 mx-auto" />
                </button>
            </div>
        </div>
    );
};

/**
 * Simulates the MenuList component.
 */
const MenuList = ({ menu }) => (
    <div className="w-full max-w-lg mt-8 p-0 z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <LayoutList className={`w-5 h-5 mr-2 ${ACCENT_TEXT}`} />
            Current Menu Items ({menu.length})
        </h3>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {menu.length === 0 ? (
                <div className="text-center p-6 text-gray-500 border border-dashed rounded-xl">
                    <Utensils className="w-6 h-6 mx-auto mb-2" />
                    No items on the menu yet.
                </div>
            ) : (
                menu.map((item) => (
                    <div key={item.id} className="p-3 bg-white rounded-lg shadow-sm border-l-4 border-red-400 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500 truncate">{item.description}</p>
                        </div>
                        <span className="font-bold text-lg text-red-700">
                            R{item.price.toFixed(2)}
                        </span>
                    </div>
                ))
            )}
        </div>
    </div>
);

/**
 * Simulates the Checkout Screen navigation.
 */
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
                    &larr; Back to Menu
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


// --- Main App Component (Simulating the Navigation and HomeScreen) ---

const App = () => {
    const [menu, setMenu] = useState(initialMenu);
    const [currentScreen, setCurrentScreen] = useState('Home'); // 'Home' or 'Checkout'

    // Simulate navigation function
    const navigation = {
        navigate: (screen, params) => {
            setCurrentScreen(screen);
        },
    };

    const addMenuItem = (item) => setMenu([...menu, item]);
    const clearMenu = () => setMenu([]);

    const renderScreen = () => {
        if (currentScreen === 'Checkout') {
            return <CheckoutScreen menu={menu} onBack={() => setCurrentScreen('Home')} />;
        }

        // --- Simulated HomeScreen Content ---
        return (
            <div className={`flex-1 flex flex-col items-center w-full max-w-lg relative ${BASE_BG} font-['Inter'] overflow-hidden`}>
                
                {/* 🔴 Top Red Semi-Circle (Simulating styles.topCircle) */}
                <div className={`w-[150vw] h-[250px] ${ACCENT_RED} rounded-b-[50%] absolute top-0 -translate-y-1/2 flex items-end justify-center pb-12 shadow-lg z-0`}>
                    <h1 className={`text-xl font-black ${WHITE_TEXT} text-center w-3/4`}>
                        Christoffel’s Daily Bite Board
                    </h1>
                </div>

                <div className="flex-grow w-full px-5 flex flex-col items-center">
                    {/* 🍽️ Add Form */}
                    <AddMenuForm addMenuItem={addMenuItem} clearMenu={clearMenu} menu={menu} />

                    {/* 📋 Menu List */}
                    <MenuList menu={menu} />
                </div>
                
                {/* 💳 Checkout Button (Simulating styles.checkoutButton) */}
                {menu.length > 0 && (
                    <button
                        className={`py-3 px-8 ${ACCENT_RED} ${WHITE_TEXT} font-bold rounded-xl shadow-lg transition hover:bg-red-800 mt-8 mb-20 z-10`}
                        onClick={() => navigation.navigate("Checkout", { menu })}
                    >
                        {/* FIX: Changed <Text> to <span> for web compatibility */}
                        <span>Go to Checkout ({menu.length} items)</span>
                    </button>
                )}
                
                {/* 🔴 Bottom Red Semi-Circle (Simulating styles.bottomCircle) */}
                <div className={`w-[150vw] h-[180px] ${ACCENT_RED} rounded-t-[50%] absolute bottom-0 translate-y-1/2 z-0`}></div>
            </div>
        );
    };

    return (
        <div className={`min-h-screen flex justify-center ${BASE_BG}`}>
            {renderScreen()}
        </div>
    );
}

export default App;
