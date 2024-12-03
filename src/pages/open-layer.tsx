import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { onMount } from 'solid-js'

export default () => {
  let mapRef: HTMLDivElement | undefined

  const key = 'z8YXFZuFBuhkY4mcVoER'
  const styleJson = `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`
  onMount(() => {
    new Map({
      target: mapRef,
      layers: [
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })
  })

  return (
    <div class=" w-screen h-screen" ref={mapRef}>

    </div>
  )
}
