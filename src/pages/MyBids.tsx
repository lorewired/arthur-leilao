import { useContext, useEffect, useState } from "react"
import { ProductTemplateProps } from "../utils/interfaces";
import { AccountContext } from "../contexts/AccountContext";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import Product from "../components/Product";

const MyBids = () => {

  const [allBids, setAllBids] = useState<ProductTemplateProps[]>([]);

  const { account } = useContext(AccountContext);

  const getAllBids = async () => {
    try {
      const url = `http://localhost:3000/api/bid/account/${account?.id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      });

      if (response.status === 200) {
        const data = await response.json();
        setAllBids(data);
      }

    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getAllBids();
  }, []);

  return (
    <Container>
      <div className="h-full flex flex-col gap-10">
        <PageTitle title="My Bids" />
        {
          allBids?.length > 0
          ?
            <div className="h-full grid grid-cols-4 auto-rows-[300px] overflow-y-auto gap-10 pr-8">
              {
                allBids?.map((p, index) => (
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
            <h3>No bids found</h3>
        }
      </div>
    </Container>
  )
}

export default MyBids