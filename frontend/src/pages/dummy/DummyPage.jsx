import { useEffect } from 'react'
import { useDummyQuery } from '../../hooks/dummy/useDummy'
import { get } from '../../services/request'

export function DummyPage() {
  const { data: dummyData, isLoading, isSuccess } = useDummyQuery()
  console.log(dummyData)
  return (
    <div>
      {isLoading && <div>I'm loading</div>}
      {isSuccess && (
        <div className="flex flex-wrap justify-around">
          {dummyData.results.map(o => (
            <div key={o.name} className="h-10 w-10 mr-10">
              <div>{o.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
