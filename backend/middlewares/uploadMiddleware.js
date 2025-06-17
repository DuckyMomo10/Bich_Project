import multer from 'multer';

// Configure storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        
        console.log('Original filename received:', file.originalname);

        // Giải mã tên tệp gốc trong trường hợp nó đã được mã hóa URL (ví dụ: khoảng trắng dưới dạng %20)
        const decodedOriginalname = decodeURIComponent(file.originalname);


        // Chuẩn hóa tên tệp đã giải mã: thay thế khoảng trắng bằng dấu gạch ngang, loại bỏ các ký tự đặc biệt
        const sanitizedOriginalname = decodedOriginalname
            .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
            .replace(/[^a-zA-Z0-9.\-_]/g, ''); // Chỉ giữ lại chữ, số, dấu chấm, dấu gạch ngang, dấu gạch dưới

        console.log('Sanitized filename:', sanitizedOriginalname);

        // Trích xuất phần mở rộng tệp (nếu có)
        const fileExtension = sanitizedOriginalname.includes('.') ? sanitizedOriginalname.split('.').pop() : '';
        const baseFilename = sanitizedOriginalname.includes('.') ? sanitizedOriginalname.substring(0, sanitizedOriginalname.lastIndexOf('.')) : sanitizedOriginalname;

        // Kết hợp hậu tố duy nhất với tên tệp đã chuẩn hóa và phần mở rộng
        const filename = `${uniqueSuffix}-${baseFilename}${fileExtension ? '.' + fileExtension : ''}`;
        cb(null, filename);
    }
})

// File filter

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Only .jpeg, jpg and .png files are allowed'), false)
    }
}

const upload = multer({storage, fileFilter})

export default upload;