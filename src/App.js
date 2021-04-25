import CommerceServicePanel from './components/CommerceSearchPanel';
import CommerceTable from './components/CommerceTable'
import useCommerce from './hooks/useCommerce'
import './App.css'

function App() {
  const { loading, commerces, getAllCommerces } = useCommerce()

  return (
    <div className="App">
        <section className="container is-flex is-flex-col is-gap-4">
          <CommerceServicePanel getAllCommerces={getAllCommerces} />
          <CommerceTable commerces={commerces} loading={loading} />
        </section>
    </div>
  );
}

export default App;
