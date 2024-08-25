export interface ReservationType {
  reservationId: string;
  userId: string;
  userName: string;
  bookId: string;
  bookName: string;
  bookImageUrl: string;
  reservationDate: Date;
  approved: boolean;
}

export const ReservationsData: ReservationType[] = [
  {
    reservationId: "R1",
    userId: "U1",
    userName: "User1",
    bookId: "B1",
    bookName: "Book1",
    bookImageUrl:
      "https://loremflickr.com/cache/resized/65535_53598740331_3dccb40e4e_c_640_480_nofilter.jpg",
    reservationDate: new Date(),
    approved: false,
  },
  {
    reservationId: "R2",
    userId: "U2",
    userName: "User2",
    bookId: "B2",
    bookName: "Book2",
    bookImageUrl:
      "https://loremflickr.com/cache/resized/65535_53615348908_e8bef946d0_c_640_480_nofilter.jpg",
    reservationDate: new Date(),
    approved: false,
  },
  {
    reservationId: "R3",
    userId: "U3",
    userName: "User3",
    bookId: "B3",
    bookName: "Book3",
    bookImageUrl:
      "https://loremflickr.com/cache/resized/65535_53045596345_30f627a67c_z_640_480_nofilter.jpg",
    reservationDate: new Date(),
    approved: false,
  },
  {
    reservationId: "R4",
    userId: "U4",
    userName: "User4",
    bookId: "B4",
    bookName: "Book4",
    bookImageUrl:
      "https://loremflickr.com/cache/resized/65535_52867186218_6ec5968682_b_640_480_nofilter.jpg",
    reservationDate: new Date(),
    approved: false,
  },
];

export interface UserType {
  userId: string;
  userName: string;
  profileImageUrl: string;
  role: "author" | "reader";
  status: "active" | "suspended";
}

export const UsersData: UserType[] = [
  {
    userId: "U1",
    userName: "User1",
    profileImageUrl:
      "https://loremflickr.com/cache/resized/4041_5124781599_54f29a323a_h_640_480_nofilter.jpg",
    role: "reader",
    status: "active",
  },
  {
    userId: "U2",
    userName: "User2",
    profileImageUrl:
      "https://loremflickr.com/cache/resized/23_32196783_ac9d45ba7c_z_640_480_nofilter.jpg",
    role: "author",
    status: "active",
  },
  {
    userId: "U3",
    userName: "User3",
    profileImageUrl:
      "https://loremflickr.com/cache/resized/65535_53475142272_2b67773bc8_c_640_480_nofilter.jpg",
    role: "author",
    status: "suspended",
  },
  {
    userId: "U4",
    userName: "User4",
    profileImageUrl:
      "https://loremflickr.com/cache/resized/65535_53475142272_2b67773bc8_c_640_480_nofilter.jpg",
    role: "reader",
    status: "suspended",
  },
];

export interface BookDataType {
  id: string;
  imageUrl: string;
  title: string;
  genre: string;
  avgRating: number;
  description: string;
  type: "free" | "premium";
}

export const bookData: BookDataType[] = [
  {
    id: "C001",
    imageUrl:
      "https://loremflickr.com/cache/resized/65535_53598740331_3dccb40e4e_c_640_480_nofilter.jpg",
    title: "The Midnight Library",
    genre: "Contemporary Fiction",
    avgRating: 4.5,
    description:
      "Nora Seed finds herself faced with the possibility of changing her life for a new one, following a different career, undoing old breakups, or realizing her dreams of becoming a glaciologist, she must search within herself as she travels through the Midnight Library to decide what is truly fulfilling in life, and what makes it worth living in the first place.",
    type: "free",
  },
  {
    id: "C002",
    imageUrl:
      "https://loremflickr.com/cache/resized/65535_53615348908_e8bef946d0_c_640_480_nofilter.jpg",
    title: "Educated",
    genre: "Memoir",
    avgRating: 4.8,
    description:
      'Tara Westover was seventeen the first time she set foot in a classroom. Born to survivalists in the mountains of Idaho, she prepared for the end of the world by stockpiling home-canned peaches and sleeping with her "head-for-the-hills" bag. In the summer she stewed herbs for her mother, a midwife and healer, and in the winter she salvaged in her father\'s junkyard.',
    type: "premium",
  },
  {
    id: "C003",
    imageUrl:
      "https://loremflickr.com/cache/resized/65535_53045596345_30f627a67c_z_640_480_nofilter.jpg",
    title: "Where the Crawdads Sing",
    genre: "Mystery",
    avgRating: 4.7,
    description:
      "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say.",
    type: "free",
  },
  {
    id: "C004",
    imageUrl:
      "https://loremflickr.com/cache/resized/65535_52867186218_6ec5968682_b_640_480_nofilter.jpg",
    title: "The Vanishing Half",
    genre: "Historical Fiction",
    avgRating: 4.6,
    description:
      "The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it's not just the shape of their daily lives that is different as adults, it's everything: their families, their communities, their racial identities.",
    type: "premium",
  },
  {
    id: "C005",
    imageUrl:
      "https://loremflickr.com/cache/resized/4041_5124781599_54f29a323a_h_640_480_nofilter.jpg",
    title: "The Silent Patient",
    genre: "Psychological Thriller",
    avgRating: 4.4,
    description:
      "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas. One evening, her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
    type: "free",
  },
  {
    id: "C006",
    imageUrl: "https://loremflickr.com/cache/resized/23_32196783_ac9d45ba7c_z_640_480_nofilter.jpg",
    title: "Circe",
    genre: "Fantasy",
    avgRating: 4.5,
    description:
      "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child - not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power - the power of witchcraft, which can transform rivals into monsters and menace the gods themselves.",
    type: "premium",
  },
  {
    id: "C007",
    imageUrl:
      "https://loremflickr.com/cache/resized/65535_53475142272_2b67773bc8_c_640_480_nofilter.jpg",
    title: "Becoming",
    genre: "Autobiography",
    avgRating: 4.9,
    description:
      "In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the world’s most famous address.",
    type: "premium",
  },
  {
    id: "C008",
    imageUrl:
      "https://loremflickr.com/cache/resized/65535_53475142272_2b67773bc8_c_640_480_nofilter.jpg",
    title: "The Night Circus",
    genre: "Fantasy",
    avgRating: 4.7,
    description:
      "The circus arrives without warning. No announcements precede it. It is simply there, when yesterday it was not. Within the black-and-white striped canvas tents is an utterly unique experience full of breathtaking amazements. It is called Le Cirque des Rêves, and it is only open at night.",
    type: "free",
  },
  {
    id: "C009",
    imageUrl:
      "https://loremflickr.com/cache/resized/1973_31678270648_4317640e32_b_640_480_nofilter.jpg",
    title: "The Book Thief",
    genre: "Historical Fiction",
    avgRating: 4.6,
    description:
      "It is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will become busier still. By her brother's graveside, Liesel's life is changed when she picks up a single object, partially hidden in the snow. It is The Gravedigger's Handbook, left there by accident, and it is her first act of book thievery.",
    type: "free",
  },
  {
    id: "C010",
    imageUrl: "https://loremflickr.com/640/480/book",
    title: "The Alchemist",
    genre: "Fiction",
    avgRating: 4.8,
    description:
      "Combining magic, mysticism, wisdom and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.",
    type: "free",
  },
];
