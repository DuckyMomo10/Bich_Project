import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
const WoodOfNheVibeBlog = () => {
  return (
    <div>
      <HeaderComponent />
    <div className="min-h-screen bg-whtie p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl bg-white p-12 rounded-2xl shadow-xl border border-gray-300 transform transition-all duration-300 hover:scale-[1.005]">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-[#c29958] leading-normal tracking-normal">WOOD OF "NHẸ VIBE"</h1>
        <p className="text-lg leading-relaxed text-[#555] font-light">MDF được viết tắt của <b className="text-[#6d4d3a]">MEDIUM DENSITY FIBERBOARD</b>, là loại ván gỗ mịn phủ nhựa melamine. Với bề mặt ván nền MDF phẳng mịn, Melamine MDF có thể đáp ứng được nhiều yêu cầu cao hơn về mặt kỹ thuật, đặc biệt với các bề mặt trang trí cần có độ bóng, mịn cao, giúp giúp các bề mặt này đạt được hiệu ứng cao nhất, các chi tiết cần khoán định hình, phủ sơn...</p>
      </div>
    </div>
    <FooterComponent/>
    </div>
  );
};

export default WoodOfNheVibeBlog; 