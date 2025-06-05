import React, { lazy, Suspense, useState } from 'react';

const CatalogApp = lazy(() => import('catalog/CatalogApp'));
const CartApp = lazy(() => import('cart/CartApp'));
// const ProfileApp = lazy(() => import('profile/ProfileApp'));

const Dashboard = () => {
  const [view, setView] = useState('catalog');

  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f0f0f0' }}>
        <button onClick={() => setView('catalog')}>🛍 Catálogo</button>
        <button onClick={() => setView('cart')}>🛒 Carrito</button>
        {/* <button onClick={() => setView('profile')}>👤 Perfil</button> */}
      </nav>

      <Suspense fallback={<p>Cargando módulo...</p>}>
        {view === 'catalog' && <CatalogApp />}
        {view === 'cart' && <CartApp />}
        {/* {view === 'profile' && <ProfileApp />} */}
      </Suspense>
    </div>
  );
};

export default Dashboard;