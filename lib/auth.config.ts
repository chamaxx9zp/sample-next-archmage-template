export const authConfig = {
  pages: {
    signIn: '/login'
  },
  providers: [],

  callbacks: {
    authorized({ auth, request }: any) {
      // console.log({ auth, mCookies: request });
      // console.log({ auth });

      // console.log({ aa: request.nextUrl, bb: request.method });

      // console.log({ request: request.method });

      const user = auth?.user;
      const isOnDashboard = request.nextUrl?.pathname.startsWith('/dashboard');
      //   const isOnAPI = request.nextUrl?.pathname.startsWith('/api/v1');
      // console.log({ user, isOnDashboard });

      // if (isOnDashboard && auth === undefined) {
      //   return false;
      // } else if (isOnDashboard && auth?.user?.isAdmin) {
      //   return true;
      // }

      //   if (!isOnDashboard) {
      //     return true;
      //   }

      return true;
    }
  }
};
