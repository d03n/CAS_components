import React from 'react'
import { useState, useEffect } from 'react'

const withAsync = (Component) => {
  return (props) => {
    if (props.loading){
      return <p>loading...</p>
    }
    
    if (props.error){
      return <p>Error: {typeof(props.error) == 'string' ? props.error : 'An unknown error occurred'}</p>
    }
    
    return <Component data={props.data}/>
  }
}

const ProductsDetail = (props) => {
  return (
    <ul>
      {
        props.data.map((data, idx) => <li key={idx}>{data.title}</li>)
      }
    </ul>
  )
}

const ProductsDetailWithAsync = withAsync(ProductsDetail);

const HOC = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    fetch('https://fakestoreapi.com/productsawdad')
    .then((res) => {
      // if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then((data) => {
      setData(data)
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      setError(err);
    });

  }, []);

  return (
    // this part is HOC solved
    // <div>
    //   {
    //     loading ? 'loading...' : data ? data.map((data, index) => <li key={index}>{data.title}</li>) : null
    //   }
    // </div>
    <ProductsDetailWithAsync loading={loading} error={error} data={data}/>
  )
}

export default HOC
