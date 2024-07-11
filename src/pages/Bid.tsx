import { useContext, useEffect, useState } from "react";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import Product from "../components/Product";
import { AccountContext } from "../contexts/AccountContext";
import { BidContext } from "../contexts/BidContext";
import PopUp from "../components/PopUp";

const Bid = () => {
  
  const [popupText, setPopupText] = useState('');
  const [popupColor, setPopupColor] = useState('');
  const [popupMargin, setPopupMargin] = useState('-200px');

  const { addBid, targetProduct, bidMessage, setBidMessage, bidValue, setBidValue } = useContext(BidContext);
  const { account } = useContext(AccountContext);

  const submitForm = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const status = await addBid();

    if (status === 201) {
      setPopupText('Bid made successfully');
      setPopupColor('bg-green-500');

      setPopupMargin('0');
      setTimeout(() => {
        setTimeout(() => setPopupMargin('mt-[-200px]'), 2500);
      }, 300);
      
      return;
    }

    if (status === 400) {
      setPopupText('Invalid Bid value or Bid Message');
      setPopupColor('bg-orange-600');

      setPopupMargin('0');
      setTimeout(() => {
        setTimeout(() => setPopupMargin('mt-[-200px]'), 2500);
      }, 300);

      return;
    }

    setPopupText(`Internal Error`);
    setPopupColor('bg-red-500');

    setPopupMargin('0');
    setTimeout(() => {
      setTimeout(() => setPopupMargin('mt-[-200px]'), 2500);
    }, 300);

    setBidMessage('');
    setBidValue(0);
  }

  return (
    <Container>
      <PopUp
        text={popupText}
        color={popupColor}
        margin={popupMargin}
      />

      <PageTitle title="Bid" />
      <div className="mt-6 flex gap-20">
        {
          account && targetProduct
          ?
            <>
              <form
                onSubmit={submitForm}
                className="h-[270px] flex flex-col gap-2 justify-between"
              >

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="bidValue">Value</label>
                    <input
                      onChange={e => setBidValue(Number(e.target.value))}
                      value={bidValue.toString()}
                      className="bg-gray-200 px-3 py-1 rounded-lg text-sm w-[300px] transition duration-300 focus:bg-gray-300"
                      type="number" 
                      placeholder="0"
                      min="1"
                      max={targetProduct!.price}
                      required
                      id="bidValue"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="bidMessage">Message</label>
                    <input
                      onChange={e => setBidMessage(e.target.value)}
                      value={bidMessage}
                      className="bg-gray-200 px-3 py-1 rounded-lg text-sm w-[300px] transition duration-300 focus:bg-gray-300"
                      type="text" 
                      placeholder="message"
                      required
                      id="bidMessage"
                    />
                  </div>
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="bg-gray-200 text-center mt-2 cursor-pointer rounded-lg py-1 transition duration-300 hover:bg-gray-300"
                />

              </form>
              <div className="flex gap-10">
                <Product
                  bidCard={true}
                  id={targetProduct.id}
                  account_id={account.id}
                  title={targetProduct.title}
                  description={targetProduct.description}
                  price={targetProduct.price}
                  image_url={targetProduct.image_url}
                />
              </div>
            </>
          :
            <h3 className="mt-6">Product for bid not found.</h3>
        }
      </div>
    </Container>
  )
}

export default Bid