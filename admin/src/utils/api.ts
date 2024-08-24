const prefix = "http://localhost:4000/api";

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

  // Suspension Management
  suspendUser: `${prefix}/user/suspend-user`,
  removeSuspension: `${prefix}/user/remove-suspension`,

  // Balance Management
  addBalance: `${prefix}/user/add-balance`,

  // Books
  getBooksBrief: `${prefix}/book/get-books-brief`,
  getBookDetails: (bookId: string) => `${prefix}/book/get-book-details/${bookId}`,

  // Ratings
  getRatings: (bookId: string) => `${prefix}/rating/get-ratings/${bookId}`,
};
