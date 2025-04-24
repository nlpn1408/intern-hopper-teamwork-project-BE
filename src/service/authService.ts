import prisma from "../config/database";

export const loginService = async (email: string, password: string) => {
  try {


    const userLogin = prisma.user.findFirst({
      where: {
        email: email
      },
    });
    if (userLogin) {
      return userLogin;
    } else {
      null;
    }
  } catch (error) {
    throw Error
  }
};
