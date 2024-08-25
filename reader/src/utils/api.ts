const prefix = "http://localhost:4000/api";

export const fetchWithToken = async (
  url: string,
  method: string,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export default {
  // User Login
  readerLogin: `${prefix}/user/login-reader`,
  authorLogin: `${prefix}/user/login-author`,
  adminLogin: `${prefix}/user/login-admin`,

  // User Registration
  readerRegister: `${prefix}/user/register-reader`,
  authorRegister: `${prefix}/user/register-author`,
  adminRegister: `${prefix}/user/register-admin`,

  // User Profile Management
  changeFullName: `${prefix}/user/change-fullname`,
  changePassword: `${prefix}/user/change-password`,
  changeProfileImage: `${prefix}/user/change-profile-image`,

  // Membership Management
  addMembership: `${prefix}/user/add-membership`,
  removeMembership: `${prefix}/user/remove-membership`,

  // Get User
  getAllUsers: `${prefix}/user/get-all-users`,
  getUserById: (userId: string) => `${prefix}/user/get-user-by-id/${userId}`,
  getUserByRole: (role: string) => `${prefix}/user/get-user-by-role/${role}`,

  // Suspension Management
  suspendUser: (userId: string) => `${prefix}/user/suspend-user/${userId}`,
  removeSuspension: (userId: string) => `${prefix}/user/remove-suspension/${userId}`,

  // Balance Management
  addBalance: `${prefix}/user/add-balance`,

  // Books
  getBooksBrief: `${prefix}/book/get-books-brief`,
  getBookDetails: (bookId: string) => `${prefix}/book/get-book-details/${bookId}`,
  getRecommendedBooks: `${prefix}/book/get-recommended-books`,

  // Reservations
  getAllReservations: `${prefix}/reservation/get-all-reservations`,
  getReservationById: (reservationId: string) =>
    `${prefix}/reservation/get-reservation-by-id/${reservationId}`,
  createReservation: (bookId: string) => `${prefix}/reservation/create-reservation/${bookId}`,
  updateReservationStatus: (reservationId: string) =>
    `${prefix}/reservation/update-reservation-status/${reservationId}`,
  deleteReservation: (reservationId: string) =>
    `${prefix}/reservation/delete-reservation/${reservationId}`,

  // Ratings
  giveRating: (bookId: string) => `${prefix}/rating/give-rating/${bookId}`,
  getRatings: (bookId: string) => `${prefix}/rating/get-ratings/${bookId}`,

  // Payments
  getAllPayments: `${prefix}/payment/get-all-payments`,

  // Favorites
  getFavourites: `${prefix}/favourite/get-favourites`,
  addToFavourite: (bookId: string) => `${prefix}/favourite/add-to-favourite/${bookId}`,
  removeFromFavourite: (bookId: string) => `${prefix}/favourite/remove-from-favourite/${bookId}`,
};
