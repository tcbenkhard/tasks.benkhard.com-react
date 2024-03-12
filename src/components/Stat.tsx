
import './Stat.scss'
export interface StatProps {
    name: string,
    value: string | number
}

export const Stat = ({name, value}: StatProps) => {
    return (
        <div className={'stat'}>
            <span className={'stat-name'}>{name}</span>
            <span className={'stat-value'}>{value}</span>
        </div>
    )
}