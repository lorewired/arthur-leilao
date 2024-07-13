import { useContext, useEffect, useState } from "react"
import Container from "../components/Container"
import PageTitle from "../components/PageTitle"
import { ProductTemplateProps } from "../utils/interfaces";
import { AccountContext } from "../contexts/AccountContext";
import Product from "../components/Product";
import NotLogged from "../components/NotLogged";

const MyProducts = () => {
  const [allBids, setAllBids] = useState<ProductTemplateProps[]>([]);

  const { account } = useContext(AccountContext);

  const getAllBids = async () => {
    try {
      const url = `https://arthur-leilao-api-production.up.railway.app/api/account/${account?.id}/bids`;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
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
      <PageTitle title="My Products" />
      {
        account
          ?
          <div className="mt-10">
            {
              allBids && allBids.length > 0
                ?
                <div className="h-full flex grid grid-cols-4 auto-rows-[300px] overflow-y-auto gap-10 pr-8">
                  {allBids.map((bid, index) => (
                    <div key={index} >
                      <Product
                        account_id={bid.account_id}
                        bidCard={false}
                        title={bid.title}
                        description={bid.description}
                        price={bid.price}
                        image_url={bid.image_url}
                      />
                    </div>
                  ))}
                </div>
                :
                <h3>No bids found</h3>
            }
          </div>
          :
          <NotLogged />
      }
    </Container>
  )
}

export default MyProducts