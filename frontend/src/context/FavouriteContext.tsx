import { createContext, useContext, useState } from "react";
import { ProductType } from "../types/Product";

// Định nghĩa kiểu dữ liệu cho context
interface FavouriteContextType {
  favourites: ProductType[]; // Mảng chứa các sản phẩm yêu thích
  toggleFavourite: (product: ProductType) => void; // Hàm thay đổi trạng thái yêu thích của sản phẩm (thêm/xóa)
  isFavourite: (productId: string | number) => boolean; // Hàm kiểm tra sản phẩm có phải là yêu thích hay không
}

// Tạo context cho danh sách yêu thích
const FavouriteContext = createContext<FavouriteContextType | undefined>(
  undefined
);

// Component Provider cung cấp dữ liệu cho các component con
export const FavouriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Sử dụng useState để lưu trữ danh sách các sản phẩm yêu thích
  const [favourites, setFavourites] = useState<ProductType[]>([]);

  // Hàm để thêm hoặc xóa sản phẩm khỏi danh sách yêu thích
  const toggleFavourite = (product: ProductType) => {
    setFavourites((prev) => {
      // Kiểm tra xem sản phẩm đã có trong danh sách yêu thích chưa
      const exist = prev.find((item) => item._id === product._id);
      if (exist) {
        // Nếu sản phẩm đã có, xóa sản phẩm khỏi danh sách yêu thích
        return prev.filter((item) => item._id !== product._id);
      } else {
        // Nếu sản phẩm chưa có, thêm sản phẩm vào danh sách yêu thích
        return [...prev, product];
      }
    });
  };

  // Hàm kiểm tra sản phẩm có nằm trong danh sách yêu thích không
  const isFavourite = (productId: string | number) => {
    return favourites.some((item) => item._id === productId); // Kiểm tra dựa trên id của sản phẩm
  };

  return (
    // Cung cấp dữ liệu và các hàm cho các component con thông qua context
    <FavouriteContext.Provider
      value={{ favourites, toggleFavourite, isFavourite }}
    >
      {children} {/* Các component con sẽ nhận được giá trị từ context */}
    </FavouriteContext.Provider>
  );
};

// Custom hook để sử dụng context trong các component con
export const useFavourite = () => {
  // Lấy context từ FavouriteContext
  const context = useContext(FavouriteContext);

  // Nếu context không tồn tại, ném lỗi
  if (!context) {
    throw new Error("useFavourite must be used within a FavouriteProvider");
  }

  return context; // Trả về các giá trị context: favourites, toggleFavourite, isFavourite
};

/**
 * FavouriteContext: Được tạo ra để chia sẻ trạng thái và các hàm liên quan đến sản phẩm yêu thích giữa các component con.

 * FavouriteProvider: Đây là nơi xử lý logic chính của việc thêm và xóa sản phẩm yêu thích, đồng thời cung cấp dữ liệu này cho các component con qua context.

 * useFavourite: Hook này giúp các component con dễ dàng truy cập vào context mà không cần phải truyền dữ liệu qua props, giúp mã nguồn gọn gàng hơn và dễ bảo trì hơn.
 */
