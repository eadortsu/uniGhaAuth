export default function (context) {
  return {
    httpEndpoint: 'https://api.core.heny.app/graphql',
    getAuth: () => 'Bearer my-static-token', // use this method to overwrite functions
  }
}
