import { Fragment, useState} from 'react'
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

const markers = [
  {
    id: 1,
    name: "San Luis",
    position: { lat: 32.43015846893186, lng: -114.76246225527765 },
  },
  {
    id: 2,
    name: "Tailandia",
    position: { lat: 16.33067605156471, lng: 100.95199563431838 },
  },
  {
    id: 3,
    name: "Baku",
    position: { lat: 40.3947365, lng: 49.6898045 },
  }
]

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  })

  const [activeMarker, setActiveMarker] = useState(null)

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker){
      return;
    }
    setActiveMarker(marker);
  }

  return (
    <Fragment>
      <div className='container'>
        <h1 className='text-center'>Vite y React | Google Map Markers</h1>
        <div style={{width: "100%", height: "90vh" }}>
          { isLoaded ? (
          <GoogleMap center={{ lat: 23.621467541373846, lng: -102.60333704454986 }}
            zoom={4} 
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{
            width: "100%", height: "90vh",
          }}>
            {
              markers.map(({id, name, position}) => (
                <MarkerF key={id} position={position} 
                onClick={() => handleActiveMarker(id)}
                icon={{
                  url: "https://www.svgrepo.com/show/109905/star.svg",
                  scaledSize: { width:50, height: 50 }
                }}>
                {
                  activeMarker === id ? 
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <p>{name}</p>
                    </div>
                  </InfoWindowF> : null
                }
                </MarkerF>
              ))
            }
          </GoogleMap> 
          ): null}
          
        </div>
      </div>
    </Fragment>
  )
}

export default App
