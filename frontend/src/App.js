import './App.css'
import { Suspense } from 'react'
import { RouteConfig } from '@/RouteConfig'
import { QueryClientProvider } from './componets/QueryClientProvider'
import AuthProvider from './componets/AuthProvider'
// import { AuthProvider as Auth } from 'react-auth-kit'
function App() {
  return (
    // <Auth authType={'cookie'}
    //   authName={'_auth'}
    //   cookieDomain={window.location.hostname}
    //   cookieSecure={window.location.protocol === 'https:'}
    // >
    <AuthProvider>
      <QueryClientProvider>
        <Suspense fallback={<>loading</>}>
          <RouteConfig></RouteConfig>
        </Suspense>
      </QueryClientProvider>
    </AuthProvider>
    // </Auth>
  )
}

export default App
