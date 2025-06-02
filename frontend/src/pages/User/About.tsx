import React from "react";
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";

const About = () => {
  return (
    <div>
      <HeaderComponent />
      <div className="">
        <main className=" flex justify-center px-4 md:px-10 lg:px-20 py-10">
          <div className="max-w-3xl justify-center items-center mx-auto flex flex-col">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#c29958] pb-5">
              About Nhẹ Vibe
            </h1>
              <p className="text-base md:text-lg leading-relaxed">
                Xin chào, chúng mình là{" "}
                <span className="font-medium">Nhẹ Vibe</span>.
              </p>
            <div className="text-base md:text-lg text-left leading-loose items-start">
              <p>
                Nhẹ Vibe bắt đầu từ mong muốn tìm kiếm cảm giác bình yên trong
                không gian sống – một góc nhỏ để chúng mình trốn khỏi nhịp sống
                công sở, tìm về những điều nhẹ nhàng và giản đơn.
              </p>
              <p>
                Với chúng mình, không quan trọng không gian sống rộng rãi hay
                nhỏ hẹp mà là cảm nhận của bạn khi trở về sau một ngày học tập
                và làm việc, nơi mọi thứ xung quanh hòa hợp với cảm xúc và viết
                nên câu chuyện của chính mình.
              </p>
              <p>
                Từng món đồ, từng chi tiết decor ở Nhẹ Vibe đều được lựa chọn
                một cách tự nhiên, không theo bất kỳ khuôn mẫu nào. Chỉ đơn giản
                là những món đồ khiến chúng mình thấy vui, thấy yên, và hy vọng
                bạn cũng sẽ cảm nhận được điều đó.
              </p>
              <p>
                Mong là Nhẹ Vibe sẽ trở thành một nơi thật dễ chịu để bạn dừng
                chân, thả lỏng và tìm thấy một chút bình yên giữa những ngày vội
                vã.
              </p>
            </div>
          </div>
        </main>
      </div>
      <FooterComponent />
    </div>
  );
};

export default About;
