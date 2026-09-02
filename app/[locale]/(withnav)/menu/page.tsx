import Image from "next/image";

const burgers = [
    {
        id: 1,
        name: "Chicken Burger",
        description:
            "Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        price: 4.5,
        oldPrice: 5.5,
        image: "/Image/MenuBurger1.png",
    },
    {
        id: 2,
        name: "Floating Burger",
        description:
            "Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        price: 5.0,
        oldPrice: 6.5,
        image: "/Image/MenuBurger2.png",
    },
    {
        id: 3,
        name: "Fritz Burger",
        description:
            "Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        price: 3.5,
        oldPrice: 5.5,
        image: "/Image/MenuBurger3.png",
    },
    {
        id: 4,
        name: "Pampa Burger",
        description:
            "Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        price: 4.5,
        oldPrice: 5.5,
        image: "/Image/Burger4.png",
    },
    {
        id: 5,
        name: "Piratni Burger",
        description:
            "Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        price: 4.5,
        oldPrice: 5.5,
        image: "/Image/MenuBurger5.png",
    },
    {
        id: 6,
        name: "La Plata Burger",
        description:
            "Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        price: 4.5,
        oldPrice: 5.5,
        image: "/Image/MenuBurger6.png",
    },
];

export default function Menu() {
    return (
        <div className="py-20 px-8 bg-gray-100">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-center text-4xl font-extrabold mb-4">
                    <span className="text-gray-900">Favorite</span>{" "}
                    <span className="text-yellow-500">Menu</span>
                </h1>
                <p className="text-center text-lg font-semibold text-gray-900 mb-12">
                    you can select your range-able burger
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {burgers.map((burger) => (
                        <div key={burger.id} className="bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                            <div className="relative w-full h-52">
                                <Image
                                    src={burger.image}
                                    alt={burger.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {burger.name}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    {burger.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-600 font-bold">
                                            $ {burger.price.toFixed(2)}
                                        </span>
                                        <span className="text-gray-400 line-through text-sm">
                                            $ {burger.oldPrice.toFixed(2)}
                                        </span>
                                    </div>
                                    <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-md">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-12">
                    <button className="border border-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-50">
                        Explore Menu
                    </button>
                </div>
            </div>
        </div>
    );
}