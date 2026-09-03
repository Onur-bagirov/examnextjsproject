import Image from "next/image";

export default function Footer()
{
    return(
        <footer>
            <div className="bg-gray-950 px-8 py-8">
                <div className="flex flex-wrap items-center gap-4 max-w-7xl mx-auto">
                    <h2 className="text-white text-sxl font-bold shrink-0">
                        Contact Us
                    </h2>
                    <input 
                        type="email" 
                        placeholder="Enter your mail" 
                        className="flex-1 min-w-[200px] bg-blue-100 text-gray-900 placeholder-gray-500 rounded-full px-6 py-3 outline-none"/>
                    
                    <input  
                        type="text"
                        placeholder="Enter your message"
                        className="flex-1 min-w-[200px] bg-blue-100 text-gray-900 placeholder-gray-500 rounded-full px-6 py-3 outline-none"/>
                    <button className="bg-red-600  hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full shrink-0" >
                        Submit
                    </button>
                </div> 
            </div>
            <div className="bg-gray-100 px-8 py-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10" >
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Image
                                src="/Image/heder1.png"
                                alt="heder1"
                                width={48}
                                height={48}
                                className="object-cover w-12 h-12 rounded-full"/>
                            <span className="text-2xl font-bold text-gray-900">
                                BURGER <span className="italic font-normal">Hut</span>
                            </span>
                        </div>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                The burger is so delicious and the service is up to the mark. We
                                love the ambience. Also a cool place for couple. Quite
                                expensive, but worth it! Their brioche bun is in a whole new
                                league of its own. If taste is your priority, you can
                                undoubtedly give it a try here!
                            </p>
                            <div className="flex gap-5 items-center">
                                <Image
                                    src="/Image/twitter.png"
                                    alt="twitter"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer"/>
                                <Image
                                    src="/Image/facebook-app-symbol.png"
                                    alt="facebook"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer"/>
                                <Image
                                    src="/Image/instagram.png"
                                    alt="instagram"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer"/>
                                <Image
                                    src="/Image/github.png"
                                    alt="github"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer"/>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-900">All Navigations</h3>
                            <ul className="space-y-3 text-gray-800 font-medium list-disc list-inside">
                            <li>Home</li>
                            <li>Menu</li>
                            <li>Hot Deals</li>
                            <li>Blog</li>
                            <li>Booking Events</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-900">Contact Info</h3>
                            <ul className="space-y-3 text-gray-800 font-medium list-disc list-inside">
                            <li>01241-31215169</li>
                            <li>burgerhut@gmail.com</li>
                            <li>Street: 1-road, Chittagong</li>
                            <li>Chattogram, Bangladesh</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-900">Opening Time</h3>
                            <ul className="space-y-3 text-gray-800 font-medium list-disc list-inside">
                                <li>
                                    Saturday to Wednesday
                                    <br />
                                    <span className="ml-4">(8:00 am to 9:00 pm)</span>
                                </li>
                                <li>
                                    Thursday (8am to 7pm)
                                </li>
                                <li>
                                    Friday (<span className="text-green-600">Close</span>)
                                </li>
                            </ul>
                        </div>
                    <div/>
                </div>
                <div className="text-center  py-1">
                    <div className="border-t border-gray-900 mt-10 w-full" />   
                    <p className="font-bold text-gray-900 mt-5">
                        Copyright <span className="text-blue-500">©</span> 2014, burger hut{" "}
                        <span className="text-red-600">foodies</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}