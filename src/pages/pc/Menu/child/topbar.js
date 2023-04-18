// import logoCue from '@/assets/img/logo-cue.png';

const TopBar = () =>{

    const goHome = () =>{

    }
    const logoCue = "'@/assets/img/logo-cue.png'"
    return <div className="top-bar">
        <img className="top-btn sys-icon" src={logoCue} alt="" onClick={() =>goHome()} />
        </div>

}

export default TopBar;
