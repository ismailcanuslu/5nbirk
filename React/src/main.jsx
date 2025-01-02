import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';

import "./locales"
import router from './router'


createRoot(document.getElementById('root')).render(

  <I18nextProvider i18n={i18n}>
    <RouterProvider router={router} />
  </I18nextProvider>


)
