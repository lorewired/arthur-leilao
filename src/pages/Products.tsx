import { useEffect, useState } from "react";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import Product from "../components/Product";
import { ProductTemplateProps } from "../utils/interfaces";

const Products = () => {
  const [products, setProducts] = useState<ProductTemplateProps[]>([]);

  const getAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (response.status === 200) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container>
      <div className="h-full flex flex-col gap-10">
        <PageTitle title="Products" />
        {
          products?.length > 0
          ?
            <div className="h-full grid grid-cols-4 auto-rows-[300px] overflow-y-auto gap-10 pr-8">
              {
                products?.map((p, index) => (
                  <div
                    key={index}
                  >
                    <Product
                      bidCard={false}
                      id={p.id}
                      account_id={p.account_id}
                      title={p.title}
                      description={p.description}
                      price={p.price}
                      image_url={p.image_url}
                    />
                  </div>  
                ))
              }
            </div>
          :
            <h3>No products found</h3>
        }
      </div>
    </Container>
  )
}

export default Products