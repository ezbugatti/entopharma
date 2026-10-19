"use client";

import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { Branch } from "@/lib/types";
import { directionsUrl } from "./BranchCard";

// ento.mn-ийн branch/MapComponent-тэй ижил marker
const icon = new L.Icon({
  iconUrl: "/images/markers/logofalse.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: "branch-marker",
});

const activeIcon = new L.Icon({
  iconUrl: "/images/markers/logotrue.svg",
  iconSize: [54, 50],
  iconAnchor: [27, 50],
  popupAnchor: [0, -50],
  className: "branch-marker-active",
});

const UB_CENTER: [number, number] = [47.9185, 106.9177];

function Viewport({ branches, selectedId }: { branches: Branch[]; selectedId: string | null }) {
  const map = useMap();
  const frame = useRef<() => void>(() => {});

  frame.current = () => {
    const selected = branches.find((b) => b._id === selectedId);
    if (selected) {
      map.flyTo([selected.lat, selected.lng], 16, { duration: 0.6 });
    } else if (branches.length > 1) {
      map.fitBounds(L.latLngBounds(branches.map((b) => [b.lat, b.lng])), { padding: [40, 40] });
    } else if (branches.length === 1) {
      map.setView([branches[0].lat, branches[0].lng], 15);
    }
  };

  useEffect(() => frame.current(), [branches, selectedId]);

  // Контейнерийн хэмжээ өөрчлөгдөхөд (цонх, responsive layout) Leaflet-д мэдэгдэж дахин багтаана
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
      frame.current();
    });
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);

  return null;
}

export default function BranchMap({
  branches,
  selectedId,
  onSelect,
}: {
  branches: Branch[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <MapContainer center={UB_CENTER} zoom={12} scrollWheelZoom className="h-full w-full rounded-3xl">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Viewport branches={branches} selectedId={selectedId} />
      {branches.map((b) => (
        <Marker
          key={b._id}
          position={[b.lat, b.lng]}
          icon={b._id === selectedId ? activeIcon : icon}
          zIndexOffset={b._id === selectedId ? 1000 : 0}
          eventHandlers={{ click: () => onSelect(b._id) }}
        >
          <Popup>
            <div className="flex flex-col gap-1">
              <strong className="text-sm text-ink-700">{b.name}</strong>
              <span className="text-xs text-ink-500">{b.address}</span>
              <a href={directionsUrl(b)} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold !text-brand-500">
                Чиглэл авах →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
