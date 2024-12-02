import View from 'ol/View.js';
import Map from 'ol/Map.js';
import { onMount } from 'solid-js';
import OSM from 'ol/source/BingMaps';
import TileLayer from 'ol/layer/Tile';
import olms from 'ol-mapbox-style';

export default () => {

    let mapRef: HTMLDivElement | undefined

    const key = 'z8YXFZuFBuhkY4mcVoER';
    const styleJson = `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`;https://api.maptiler.com/maps/openstreetmap/style.json?key=z8YXFZuFBuhkY4m
    onMount(() => {
        const map = new Map({
            target: mapRef,
            layers: [
                new TileLayer({ source: new OSM() }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });

    })

    return (
        <div class=' w-screen h-screen' ref={mapRef}>

        </div>
    )
}