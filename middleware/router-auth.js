export default function ({store, route, redirect}) {
  const publicPages = ['/account/login', '/account/register', '/account/forgot-password'];
  const authpage = publicPages.includes(route.path);
  if (authpage) {
    redirect();
  } else {

    store.dispatch('user/validateToken', null).then((valid) => {
      if (!valid) {
        redirect('/auth');
      } else {
        redirect();
      }
    })
  }
}
