# Electron + instant auth

1. add instant app id in `/src/db.ts`
2. setup redirect origin in instantdb dashboard
3. setup redirect origin `APP_LINK` in:
   1. `/electron/main.ts`
   2. `/src/ElectronGoogleLoginButton.tsx`
4. make a build with `npm run build`
5. copy `/release/0.0.0/mac-arm64/YourAppName.app` to `/Applications`
6. run `YourAppName.app`
7. click `continue with google`
8. go through oauth flow
9. after it redirects you should be logged in
10. google oauth account selector stays open in browser with loading state?