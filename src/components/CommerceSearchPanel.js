import { useState, useEffect } from 'react'
// import useCommerce from '../hooks/useCommerce'
import { clone } from '../utils'

const CommerceSearchPanel = ({ getAllCommerces }) => {
    const [search, setSearch] = useState('')
    const [filters, setFilters] = useState({})
    const [status, setStatus] = useState([
        {text: 'Activo', value: 1, checked: true},
        {text: 'No activo', value: 0, checked: true}
    ])
    const [order, setOrder] = useState({
        field: 'id',
        asc: true
    })
    // const { getAllCommerces } = useCommerce()
    const [showMenu, setShowMenu] = useState(false)

    const toggleOrder = () => setOrder({...order, asc: !order.asc})

    const addFieldInFilters = (event, field) => {
        if(event.target.checked && search) {
            setFilters({...filters, [field]: {"$regex": search}})
        } else {
            const newFilters = clone(filters)
            delete newFilters[field]

            setFilters(newFilters)
        }
    }

    const changeStatus = (event, item) => {
        const newStatus = clone(status)
        const index = newStatus.findIndex(el => el.text === item.text)
        newStatus[index].checked = event.target.checked

        setStatus(newStatus)
    }

    const buildFilter = () => {
        let q = {}
        let h = {"$orderby": {[order.field]: order.asc ? 1 : -1}}
        q = {...filters}

        const isAllSelected = status.every(el => el.checked)
        if(!isAllSelected) {
            q.active = { $in: status.filter(item => item.checked).map(item => item.value) }
        }

        return { q, h }
    }

    const handlerInput = (event) => {
        setSearch(event.target.value)

        if(!event.target.value) {
            setShowMenu(false)
            setFilters({})
        } else {
            setShowMenu(true)
        }
    }

    const handlerSubmit = (event) => {
        event.preventDefault()
        const { q, h } = buildFilter()
        getAllCommerces(q, h)
        setShowMenu(false)
    }

    useEffect(() => {
        const { q, h } = buildFilter()
        getAllCommerces(q, h)
        setShowMenu(false)
    }, [])

    useEffect(() => {
        const { q, h } = buildFilter()
        getAllCommerces(q, h)
    }, [status, order])

    return (
        <header className="search-panel">
            <div className="is-flex is-gap-4 is-items-center">
                <div className="search">
                    <form className="search-bar" onSubmit={handlerSubmit}>
                        <input 
                            type="search"
                            value={search} 
                            onInput={handlerInput}
                            className="search-bar__input" 
                        />
                        <div className="is-flex is-gap-2 is-items-center">
                            {
                                Object.keys(filters)?.map(el => (
                                    <label className="is-text-light" key={el}>{el} |</label>
                                ))
                            }
                        </div>
                        <button type="submit" className="search-bar__btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search search-bar__icon" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    </form>

                    {
                        showMenu && (
                            <aside className="menu">
                                <ul className=" list list--base">
                                    <li className="list__item">Elige un campo para filtrar</li>
                                    <li className="list__item list__item--hover">
                                        <label className="input-group">
                                            <input 
                                                className="input-group__input"
                                                type="checkbox" 
                                                onChange={(event => addFieldInFilters(event, 'id'))} 
                                            />
                                            <span className="input-group__label">ID</span>
                                        </label>
                                    </li>
                                    <li className="list__item list__item--hover">
                                        <label className="input-group">
                                            <input 
                                                className="input-group__input"
                                                type="checkbox"  
                                                onChange={(event => addFieldInFilters(event, 'cuil'))} 
                                            />
                                            <span className="input-group__label">CUIL</span>
                                        </label>
                                    </li>
                                    <li className="list__item list__item--hover">
                                        <label className="input-group">
                                            <input 
                                                className="input-group__input"
                                                type="checkbox"  
                                                onChange={(event => addFieldInFilters(event, 'name'))} 
                                            />
                                            <span className="input-group__label">Nombre</span>
                                        </label>
                                    </li>
                                </ul>
                            </aside>
                        )
                    } 
                </div>
                <div className="is-flex is-gap-2 is-items-center">
                    {status.map(item => (
                        <label key={item.value}>
                            <input type="checkbox" checked={item.checked} onChange={event => changeStatus(event, item)}/>
                            <span>{item.text}</span>
                        </label> )  
                    )}
                </div>
                <div className="is-flex is-gap-2">
                    <button onClick={toggleOrder} className="btn btn--normal">
                        {
                        order.asc &&
                        ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-down " viewBox="0 0 16 16">
                                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                            </svg>)
                            
                        }
                        { !order.asc &&

                        (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up" viewBox="0 0 16 16">
                                <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                          </svg>    
                        )
                    }
                    </button>

                    <select value={order.field} onChange={(event) => setOrder({...order, field: event.target.value})} className="select">
                        <option value="id" defaultValue>ID</option>
                        <option value="cuit">CUIT</option>
                        <option value="name">Nombre</option>
                        <option value="balance">Balance</option>
                        <option value="lastSale">Última venta</option>
                    </select>
                </div>
            </div>
        </header>
    )
}

export default CommerceSearchPanel