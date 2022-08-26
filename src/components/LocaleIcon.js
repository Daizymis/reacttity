import { useTranslation } from "react-i18next";
import { connect,useStore } from "react-redux";
function LocaleIcon(props) {
    const {t, i18n} = useTranslation();
    const { locale} = useStore().getState();
    const changeLanguage = () => {
        i18n.changeLanguage(locale === 'zhCN' ? 'enUS' : 'zhCN');
        props.change(locale);
    }
    return <span className="locale-icon" onClick={() => changeLanguage()}>{t(i18n.language || 'zhCN')}</span>
}
const mapDispatchToProps = (dispatch) => {
    return {
      change(value) {
        dispatch({
          type: "change",
          value:value === 'zhCN' ? 'enUS' : 'zhCN',
        });
      },
    };
  };
  const mapStateToProps = (state) => {
    return {
      locale: state.locale,
      state,
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(LocaleIcon);