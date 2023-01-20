import {gql} from 'graphql-tag'

export default async function ({app, redirect, route}) {
  const hasToken = !!app.$apolloHelpers.getToken()
  const publicPages = ['/login', '/register', '/forgot-password'];
  const authpage = !publicPages.includes(route.path);
  const loggeduser = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  if (authpage && !loggeduser && !hasToken) {
    return redirect('/login');
  }
  // make sure the token is still valid
  if (token){
    await app.$apolloHelpers.onLogin(token)
  }
  try {
    const {data: {me}} = await app.apolloProvider.defaultClient.query({
      query: gql`
        query {
          me{
            _id
            email
            name
            phone
          }
        }
      `
    })
    if (!Object.keys(me).length) {
      await app.$apolloHelpers.onLogout()
      return redirect('/login');
    }
    // console.log(me)
    // we are good to go and validated
  } catch (e) {
    // token is not valid
    // logout user to clear storage
    // eslint-disable-next-line no-console
    console.log(e)
    try {
      // await app.$apolloHelpers.onLogout()
      // redirect them to login page
       return redirect('/login');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}
