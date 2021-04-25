import { useState } from 'react'
import CommerceService from '../services/CommerceService.js'

const  commerceService = new CommerceService()

export default function useCommerce() {
    const [commerces, setCommerces] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getAllCommerces = async (q, h) => {
        try {
            setLoading(true)
            const data = await commerceService.getAll(q, h)
            setCommerces(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    return {
        commerces,
        getAllCommerces,
        loading,
        error
    }
}