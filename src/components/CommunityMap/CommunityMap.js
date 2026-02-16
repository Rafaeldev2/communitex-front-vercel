// /src/components/CommunityMap/CommunityMap.js
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useUserLocation from '../../hooks/useUserLocation';
import useIssuesMap from '../../hooks/useIssuesMap';
import IssueService from '../../services/IssueService';
import IssueFormModal from './IssueFormModal';
import IssueCard from './IssueCard';
import styles from './CommunityMap.module.css';

// Fix para ícones do Leaflet em React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

/**
 * Configuração de ícones por tipo de denúncia
 */
const ISSUE_ICONS = {
  ILUMINACAO: { emoji: '💡', color: '#ffc107' },
  BURACO: { emoji: '🕳️', color: '#795548' },
  LIXO: { emoji: '🗑️', color: '#607d8b' },
  PODA_ARVORE: { emoji: '🌳', color: '#4caf50' },
  VAZAMENTO: { emoji: '💧', color: '#2196f3' },
  PICHACAO: { emoji: '🎨', color: '#9c27b0' },
  CALCADA_DANIFICADA: { emoji: '🚧', color: '#ff5722' },
  SINALIZACAO: { emoji: '🚦', color: '#f44336' },
  OUTRO: { emoji: '❓', color: '#9e9e9e' }
};

/**
 * Cria um ícone customizado para o marker
 */
const createCustomIcon = (tipo) => {
  const config = ISSUE_ICONS[tipo] || ISSUE_ICONS.OUTRO;
  
  return L.divIcon({
    className: styles.customMarker,
    html: `
      <div style="
        background-color: ${config.color};
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        border: 3px solid white;
      ">
        ${config.emoji}
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

/**
 * Ícone do usuário
 */
const userIcon = L.divIcon({
  className: styles.userMarker,
  html: `
    <div style="
      background: linear-gradient(135deg, #2196f3, #1976d2);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(33, 150, 243, 0.5);
    "></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

/**
 * Componente para capturar cliques no mapa
 */
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    }
  });
  return null;
};

/**
 * Componente para recentrar o mapa quando a posição mudar
 */
const RecenterMap = ({ position }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);
  
  return null;
};

/**
 * Componente para atualizar o centro do mapa quando o usuário move
 */
const MapCenterTracker = ({ onCenterChange }) => {
  const map = useMap();
  
  useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      onCenterChange({ lat: center.lat, lng: center.lng });
    }
  });
  
  return null;
};

/**
 * Componente principal do mapa comunitário
 */
const CommunityMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [selectedIssueCard, setSelectedIssueCard] = useState(null);
  const [showLocationError, setShowLocationError] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const { position: userPosition, error: locationError, isLoading: locationLoading } = useUserLocation();
  
  const { 
    issues, 
    isLoading: issuesLoading, 
    error: issuesError,
    refetch: refetchIssues,
    addInteraction 
  } = useIssuesMap(mapCenter || userPosition, 5000);

  // Lê parâmetros da URL para centralizar no mapa e abrir issue
  useEffect(() => {
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const issueId = searchParams.get('issueId');

    if (lat && lng) {
      const urlPosition = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      };
      setMapCenter(urlPosition);
    }

    // Se tiver issueId, busca e abre o card da issue
    if (issueId && !initialLoadDone) {
      const fetchAndOpenIssue = async () => {
        try {
          const response = await IssueService.findByIdWithDetails(parseInt(issueId));
          setSelectedIssueCard(response.data);
        } catch (err) {
          console.error('Erro ao buscar issue:', err);
        }
      };
      fetchAndOpenIssue();
      setInitialLoadDone(true);
      
      // Limpa os parâmetros da URL após usar
      searchParams.delete('issueId');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, initialLoadDone]);

  // Atualiza o centro do mapa quando a posição do usuário é obtida (se não veio da URL)
  useEffect(() => {
    if (userPosition && !mapCenter) {
      setMapCenter(userPosition);
    }
  }, [userPosition, mapCenter]);

  // Mostra erro de localização temporariamente
  useEffect(() => {
    if (locationError) {
      setShowLocationError(true);
      const timer = setTimeout(() => setShowLocationError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [locationError]);

  const handleMapClick = useCallback((latlng) => {
    setClickedPosition({
      lat: latlng.lat,
      lng: latlng.lng
    });
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setClickedPosition(null);
  }, []);

  const handleIssueCreated = useCallback(() => {
    refetchIssues();
  }, [refetchIssues]);

  const handleMarkerClick = useCallback(async (issue) => {
    // Busca detalhes completos da denúncia incluindo interações
    try {
      const response = await IssueService.findByIdWithDetails(issue.id);
      setSelectedIssueCard(response.data);
    } catch (err) {
      console.error('Erro ao buscar detalhes:', err);
      setSelectedIssueCard(issue);
    }
  }, []);

  const handleCloseIssueCard = useCallback(() => {
    setSelectedIssueCard(null);
  }, []);

  const handleSupport = useCallback(async (issueId, tipo, conteudo = null) => {
    const result = await addInteraction(issueId, tipo, conteudo);
    
    // Atualiza o card selecionado após interação bem-sucedida
    if (result.success && selectedIssueCard?.id === issueId) {
      try {
        const response = await IssueService.findByIdWithDetails(issueId);
        setSelectedIssueCard(response.data);
      } catch (err) {
        console.error('Erro ao atualizar detalhes:', err);
      }
    }
    
    return result;
  }, [addInteraction, selectedIssueCard?.id]);

  const handleCenterChange = useCallback((center) => {
    setMapCenter(center);
  }, []);

  const recenterOnUser = useCallback(() => {
    if (userPosition) {
      setMapCenter({ ...userPosition });
    }
  }, [userPosition]);

  // Memoiza os marcadores para evitar re-renders
  const issueMarkers = useMemo(() => {
    return issues.map((issue) => (
      <Marker
        key={issue.id}
        position={[issue.latitude, issue.longitude]}
        icon={createCustomIcon(issue.tipo)}
        eventHandlers={{
          click: () => handleMarkerClick(issue)
        }}
      >
        <Popup>
          <IssueCard 
            issue={issue} 
            isCompact 
            onSupport={handleSupport}
            onViewDetails={handleMarkerClick}
          />
        </Popup>
      </Marker>
    ));
  }, [issues, handleMarkerClick, handleSupport]);

  // Loading state
  if (locationLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Obtendo sua localização...</p>
        <p className={styles.loadingSubtext}>Permita o acesso à localização para uma melhor experiência</p>
      </div>
    );
  }

  const initialPosition = userPosition || { lat: -26.3045, lng: -48.8487 };

  return (
    <div className={styles.container}>
      {/* Notificações de erro */}
      {showLocationError && locationError && (
        <div className={styles.notification}>
          <span className={styles.notificationIcon}>📍</span>
          {locationError}
        </div>
      )}

      {issuesError && (
        <div className={styles.errorNotification}>
          <span className={styles.notificationIcon}>⚠️</span>
          {issuesError}
          <button className={styles.retryButton} onClick={refetchIssues}>
            Tentar novamente
          </button>
        </div>
      )}

      {/* Mapa */}
      <MapContainer
        center={[initialPosition.lat, initialPosition.lng]}
        zoom={15}
        className={styles.map}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onMapClick={handleMapClick} />
        <MapCenterTracker onCenterChange={handleCenterChange} />
        <RecenterMap position={mapCenter} />

        {/* Marcador do usuário */}
        {userPosition && (
          <Marker position={[userPosition.lat, userPosition.lng]} icon={userIcon}>
            <Popup>
              <div className={styles.userPopup}>
                <strong>📍 Você está aqui</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marcadores de denúncias */}
        {issueMarkers}
      </MapContainer>

      {/* Controles do mapa */}
      <div className={styles.controls}>
        <button 
          className={styles.controlButton}
          onClick={() => navigate('/denuncias/lista')}
          title="Ver lista de denúncias"
        >
          📋
        </button>
        <button 
          className={styles.controlButton}
          onClick={recenterOnUser}
          title="Centralizar na minha localização"
        >
          📍
        </button>
        <button 
          className={styles.controlButton}
          onClick={refetchIssues}
          title="Atualizar denúncias"
          disabled={issuesLoading}
        >
          {issuesLoading ? '⏳' : '🔄'}
        </button>
      </div>

      {/* Botão flutuante para nova denúncia */}
      <button 
        className={styles.fabButton}
        onClick={() => {
          if (mapCenter) {
            setClickedPosition(mapCenter);
            setIsModalOpen(true);
          }
        }}
      >
        <span className={styles.fabIcon}>+</span>
        <span className={styles.fabLabel}>Denunciar</span>
      </button>

      {/* Legenda/Info */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#4caf50' }}></span>
          <span>Toque no mapa para denunciar</span>
        </div>
        <div className={styles.legendCount}>
          {issues.length} denúncia{issues.length !== 1 ? 's' : ''} na região
        </div>
      </div>

      {/* Modal de formulário */}
      <IssueFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleIssueCreated}
        latitude={clickedPosition?.lat}
        longitude={clickedPosition?.lng}
      />

      {/* Card de detalhes da denúncia */}
      {selectedIssueCard && (
        <div className={styles.issueCardOverlay} onClick={handleCloseIssueCard}>
          <div className={styles.issueCardContainer} onClick={(e) => e.stopPropagation()}>
            <IssueCard
              issue={selectedIssueCard}
              onClose={handleCloseIssueCard}
              onSupport={handleSupport}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityMap;
