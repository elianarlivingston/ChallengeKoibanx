const CommerceTable = ({ commerces = [], loading = false}) => {

    return (
        <table className="table">
            <thead className="table__header">
                <tr className="is-grid is-grid-cols-6">
                    <th className="table__item is-bg-dark">ID</th>
                    <th className="table__item is-bg-dark">Nombre</th>
                    <th className="table__item is-bg-dark">CUIT</th>
                    <th className="table__item is-bg-dark">Balance actual</th>
                    <th className="table__item is-bg-dark">Activo</th>
                    <th className="table__item is-bg-dark">Última venta</th>
                </tr>
            </thead>

            <tbody>
                {
                    loading && ( 
                        <tr className="is-flex is-justify-center is-items-center">
                            <td className="is-w-full is-flex is-flex-col is-gap-4">
                                Loading...
                            </td>
                        </tr>
                    )
                }

                {
                    commerces?.data_to_show?.length === 0 && (
                        <tr className="is-flex is-justify-center is-items-center">
                            <td className="is-flex is-flex-col is-gap-4 is-py-8">
                                <span>No hay contenido</span>
                                <div className="is-flex is-justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-inbox" viewBox="0 0 16 16">
                                        <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"/>
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    )
                }

                {
                    commerces && (
                        commerces?.data_to_show?.map(el => (
                            <tr key={el.id} className="is-grid is-grid-cols-6">
                                <td className="table__item is-bb-1">{ el.id }</td>
                                <td className="table__item is-bb-1">{ el.name }</td>
                                <td className="table__item is-bb-1">{ el.cuit }</td>
                                <td className="table__item is-bb-1">{ el.current_balance }</td>
                                <td className="table__item is-bb-1">{ el.status }</td>
                                <td className="table__item is-bb-1">{ el.last_sale }</td>
                            </tr>
                        ))
                    )
                }
            </tbody>
            <tfoot>
                <tr>
                    <th className="table__item">Total de resultados</th>
                    <td className="table__item">{ commerces?.rows_total }</td>
                </tr>
            </tfoot>
        </table>
    )
}

export default CommerceTable