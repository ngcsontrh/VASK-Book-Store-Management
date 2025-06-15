export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  publisher: string;
  publishedDate: string;
  isbn: string;
}

// Mảng dữ liệu giả để hiển thị
export const booksData: Book[] = [
  {
    id: "1",
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    description:
      "Đắc nhân tâm (How to Win Friends and Influence People) là một quyển sách nhằm tự giúp bản thân bán chạy nhất từ trước đến nay. Tác phẩm đã được chuyển ngữ sang hầu hết các thứ tiếng trên thế giới và có mặt ở hàng trăm quốc gia.",
    price: 120000,
    imageUrl: "/static/images/books/book1.jpg",
    category: "Tự truyện",
    stock: 15,
    publisher: "NXB Tổng hợp TP.HCM",
    publishedDate: "2016-01-01",
    isbn: "9786045427712",
  },
  {
    id: "2",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    description:
      "Nhà giả kim là một cuốn sách được xuất bản lần đầu ở Brazil năm 1988, và là cuốn sách nổi tiếng nhất của nhà văn Paulo Coelho.",
    price: 85000,
    imageUrl: "/static/images/books/book2.jpg",
    category: "Tiểu thuyết",
    stock: 10,
    publisher: "NXB Hội Nhà Văn",
    publishedDate: "2017-10-01",
    isbn: "9786049758858",
  },
  {
    id: "3",
    title: "Cây Cam Ngọt Của Tôi",
    author: "José Mauro de Vasconcelos",
    description:
      "Cuốn tiểu thuyết nổi tiếng của văn học Brazil, kể về cuộc đời của cậu bé Zezé nghèo khó nhưng giàu trí tưởng tượng.",
    price: 108000,
    imageUrl: "/static/images/books/book3.jpg",
    category: "Tiểu thuyết",
    stock: 8,
    publisher: "NXB Hội Nhà Văn",
    publishedDate: "2018-03-05",
    isbn: "9786049658099",
  },
  {
    id: "4",
    title: "Tôi Tài Giỏi, Bạn Cũng Thế",
    author: "Adam Khoo",
    description:
      "Cuốn sách chia sẻ các phương pháp học tập hiệu quả giúp độc giả phát huy tối đa tiềm năng của bản thân.",
    price: 150000,
    imageUrl: "/static/images/books/book4.jpg",
    category: "Kỹ năng",
    stock: 20,
    publisher: "NXB Phụ Nữ",
    publishedDate: "2019-05-20",
    isbn: "9786045641071",
  },
];
