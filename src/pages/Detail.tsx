import { useParams } from  'react-router-dom'

export default function Detail() {
    const params = useParams();

    return (
        <div>
            user Detail-- {params.id}
        </div>
    )
}