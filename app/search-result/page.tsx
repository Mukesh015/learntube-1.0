import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";


const SerachResult: React.FC = () => {

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="mt-28 ml-72 ">
                <h1 className="mb-10 text-medium">Based on your search</h1>
                <div className="flex cursor-pointer">
                    {/* Thumbnail */}
                    <img height={250} width={350} className="rounded-lg" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" />
                    <div className="ml-6">
                        {/* Video title */}
                        <p className="text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aliquam facere, reprehenderit incidunt</p>
                        {/* details */}
                        <p className="text-sm text-gray-600 mt-3">32k views - 9 months ago</p>
                        <div className="mt-5 flex">
                            {/* channel info */}
                            <img className="h-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRrsPZFvLd_KBWHXqbzRCdOJirN7cECs6_AKmubTodg&s" alt="" />
                            <p className="font-semibold ml-3">Gaming Aura</p>
                        </div>
                        {/* video description */}
                        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eligendi voluptas, minima esse sapiente suscipit rem distinctio incidunt quam aliquid quas accusamus tempore delectus ad facere eum possimus? Quod, quia.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SerachResult;
