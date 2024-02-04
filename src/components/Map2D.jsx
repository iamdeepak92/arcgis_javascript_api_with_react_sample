import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import Sketch from "@arcgis/core/widgets/Sketch";
import LayerList from "@arcgis/core/widgets/LayerList";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel.js";
import PopupTemplate from "@arcgis/core/PopupTemplate.js";

function Map2D() {
  // References to DOM elements
  const mapRef = useRef(null);
  const sketchRef = useRef(null);
  const layerListRef = useRef(null);

  useEffect(() => {
    async function initializeMap() {
      try {
        // Define a popup template for the first layer
        const popupTemplateLayer0 = new PopupTemplate({
          title: "Object Id - {objectid}",
          content: "Area Name: {areaname}",
        });

        // Create a MapImageLayer with sublayer, including the defined popup template
        const layer = new MapImageLayer({
          url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
          sublayers: [
            {
              id: 0,
              title: "Cities",
              visible: true,
              popupTemplate: popupTemplateLayer0,
            },
          ],
        });

        // Create a GraphicsLayer for drawing
        const graphicsLayer = new GraphicsLayer({
          title: "Drawing Layer",
          listMode: "hide",
        });

        // Create a Map with basemap and layers
        const map = new Map({
          basemap: "topo-vector",
          layers: [layer, graphicsLayer],
        });

        // Create a MapView with specified properties
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-118.2437, 34.0522],
          zoom: 6,
          popupEnabled: true,
        });

        await view.when();

        // Enable default popup template for the view
        view.popup.defaultPopupTemplateEnabled = true;

        // Remove the default attribution
        view.ui.remove("attribution");

        // Set up symbols for sketching
        const pointSymbol = {
          type: "simple-marker",
          style: "circle",
          size: 10,
          color: "red",
          outline: {
            color: "red",
            width: 1,
          },
        };

        const polyLineSymbol = {
          type: "simple-line",
          color: "yellow",
          width: 2,
        };

        const polygonSymbol = {
          type: "simple-fill",
          color: "green",
          outline: {
            color: "green",
            width: 2,
          },
        };

        // Create a SketchViewModel with specified symbols
        const sketchViewModel = new SketchViewModel({
          pointSymbol: pointSymbol,
          polylineSymbol: polyLineSymbol,
          polygonSymbol: polygonSymbol,
        });

        // Initialize Sketch widget and LayerList widget
        if (!sketchRef.current) {
          sketchRef.current = new Sketch({
            layer: graphicsLayer,
            view: view,
            creationMode: "update",
            container: document.getElementById("sketch"),
            viewModel: sketchViewModel,
          });
        }

        if (!layerListRef.current) {
          layerListRef.current = new LayerList({
            view: view,
            container: document.getElementById("toc"),
          });
        }
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    }

    // Call the initialization function
    initializeMap();
  }, []);

  // Return the map container with specified style
  return (
    <div
      className="map-container"
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default Map2D;
