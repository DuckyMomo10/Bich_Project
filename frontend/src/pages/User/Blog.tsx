import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";

const Blog = () => {
  return (
    <div>
      <HeaderComponent />
      <div className="min-h-screen bg-white p-8 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-center pb-36 text-[#c29958] drop-shadow-lg leading-relaxed tracking-wide">Our Blogs</h1>
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <a href="/blog/cam-nhan-nhe" className="block bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-[#fff5e9] group">
            <h2 className="text-2xl font-semibold text-[#6d4d3a] mb-4 group-hover:text-[#8b5a41]  leading-tight">Vì sao lại là Cảm nhận nhẹ, sống trọn VIBE</h2>
            <p className="text-md text-[#777] leading-relaxed">Khám phá triết lý sống nhẹ nhàng, thư thái và tận hưởng từng khoảnh khắc.</p>
          </a>
          <a href="/blog/wood-of-nhe-vibe" className="block bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-[#fff5e9] group">
            <h2 className="text-2xl font-semibold text-[#6d4d3a] mb-4 group-hover:text-[#8b5a41] leading-tight">WOOD OF "NHẸ VIBE"</h2>
            <p className="text-md text-[#777] leading-relaxed">Tìm hiểu về chất liệu gỗ MDF cao cấp và ứng dụng trong nội thất của Nhẹ Vibe.</p>
          </a>
        </div>
        {/* This is where the actual blog content will be rendered based on routing */}
      </div>
      <FooterComponent />
    </div>
  );
};

export default Blog;
