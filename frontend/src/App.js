import './App.css'
import { Suspense } from 'react'
import { RouteConfig } from '@/RouteConfig'
import { QueryClientProvider } from './componets/QueryClientProvider'

function App() {
  return (
    <>
      <QueryClientProvider>
        <Suspense fallback={<>loading</>}>
          <RouteConfig></RouteConfig>
        </Suspense>
      </QueryClientProvider>
    </>
  )
}

export default App
