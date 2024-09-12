import { Provider } from 'react-redux';
import store from '../../store/store'; 
import FormComponent from '../../components/FormComponent/FormComponent';
import TableComponent from '../../components/TableComponent/TableComponent';
import './style.scss';
import ErrorBoundary from '../../components/Error/ErrorBoundary';
import MenuLan from '../../components/menuLan/Language';
import useLanguage from '../../hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Index() {
  useLanguage();
  const location = useNavigate();
  const { t } = useTranslation();
  
  const backHome = () => {
    location('/')
  }

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div>
          <div className='form-navbar'>
            <h1>{t("tests.test3.description")}</h1>
            <div>
              <MenuLan />
              <button onClick={backHome} className='home-btn'>{t('form.home')}</button>
            </div>
          </div>
          <FormComponent />
          <TableComponent />
        </div>        
      </ErrorBoundary>
    </Provider>
  );
}

export default Index;
