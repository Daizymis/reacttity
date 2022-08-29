import { useTranslation } from "react-i18next";
import { connect,useStore } from "react-redux";
function LocaleIcon(props) {
    const {t, i18n} = useTranslation();
    const { locale} = useStore().getState();
    console.log(i18n.language, locale);
    const changeLanguage = () => {
        i18n.changeLanguage(locale === 'zhCN' ? 'enUS' : 'zhCN');
        props.change(locale);
        // window.location.reload()
    }
    return <span className="locale-icon" onClick={() => changeLanguage()}>{t(locale || 'zhCN')}</span>
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