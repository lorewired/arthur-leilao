import { useContext, useEffect, useState } from "react";
import BidCard from "../components/BidCard";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import { AccountContext } from "../contexts/AccountContext";
import { BidData } from "../utils/interfaces";

const MyBids = () => {

  const [allBids, setAllBids] = useState<BidData[]>([]);

  const { account } = useContext(AccountContext);

  const getAllBids = async () => {
    try {
      const url = `https://arthur-leilao-api-production.up.railway.app/api/bid/account/${account?.id}`;
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
  }, [account]);

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
                    <BidCard
                      account_id={p.account_id}
                      product_id={p.product_id}
                      bid_value={p.bid_value}
                      bid_message={p.bid_message}
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