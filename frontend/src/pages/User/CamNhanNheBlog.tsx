import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
const CamNhanNheBlog = () => {
  return (
    <div>
      <HeaderComponent />
      <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center">
        <div className="max-w-4xl bg-white p-12 rounded-2xl shadow-xl border border-gray-300 transform transition-all duration-300 hover:scale-[1.005]">
          <h1 className="text-5xl font-extrabold text-center mb-12 text-[#c29958] leading-normal tracking-normal">
            Vì sao lại là Cảm nhận nhẹ, sống trọn VIBE
          </h1>
          <p className="text-lg leading-relaxed mb-6 text-[#555] font-light">
            Trong nhịp sống hiện đại hối hả, chúng ta luôn khao khát tìm về một
            chốn bình yên – nơi mỗi góc nhỏ của ngôi nhà không chỉ đơn thuần là
            vật chất mà còn là nguồn cảm hứng sống, mang đến sự thư thái và tự
            do cho tâm hồn.
          </p>
          <p className="text-lg leading-relaxed mb-8 text-[#555] font-light">
            Ở đây,{" "}
            <span className="font-medium text-[#6d4d3a]">
              "Cảm nhận nhẹ, sống trọn vibe"
            </span>{" "}
            không chỉ là khẩu hiệu, mà còn là phong cách sống của chúng mình.
          </p>
          <ul className="list-none space-y-5 mb-8 text-lg text-[#555] px-4">
            <li className="flex items-start">
              <span className="text-[#8b5a41] text-xl mr-3">&#x2022;</span>
              <p>
                <b className="text-[#6d4d3a]">"Cảm nhận nhẹ"</b>: không chỉ nói
                về thiết kế tối giản, tinh tế mà còn là cảm giác thư thái, không
                gò bó, mang lại sự thoải mái, êm dịu mỗi khi bạn trở về chốn
                thân quen
              </p>
            </li>
            <li className="flex items-start">
              <span className="text-[#8b5a41] text-xl mr-3">&#x2022;</span>
              <p>
                <b className="text-[#6d4d3a]">"Sống trọn vibe"</b>: là khi bạn
                tận hưởng trọn vẹn góc nhỏ bình yên của mình - nơi được tạo nên
                bởi một câu chuyện, một phong cách sống riêng, mà ở đó từng cảm
                xúc chân thật, bình dị nhất của bạn được thể hiện.
              </p>
            </li>
          </ul>
          <div className="border-t border-gray-200 pt-6 mt-6 text-center">
            <p className="text-md leading-relaxed mb-2 text-[#777]">
              Chúng mình ở đây, lúc nào cũng có một góc nhỏ chờ bạn:{" "}
              <a
                href="https://www.instagram.com/nhevibe.furnicozy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                @nhevibe.furnicozy
              </a>
            </p>
            <p className="text-md leading-relaxed mb-2 text-[#777]">
              Hotline:{" "}
              <span className="font-semibold text-[#6d4d3a]">0983192454</span>
            </p>
            <p className="text-md leading-relaxed text-[#777]">
              #chungminhnhevibe #binhyen #noithat #decor #furniture
            </p>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default CamNhanNheBlog;
