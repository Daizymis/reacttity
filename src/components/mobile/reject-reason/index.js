import style from './index.module.scss'
export function RejectReason({reason = ""}) {
    return <div className={style.reject}>
        <p className="fz-35 font-PF-medium">驳回原因</p>
        <p className="fz-28">{reason}</p>
    </div>
}
