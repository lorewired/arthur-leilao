import { createContext, useContext, useState } from "react";
import { AccountProviderProps, BidContextType, ProductTemplateProps } from "../utils/interfaces";
import { AccountContext } from "./AccountContext";

const defaultContextValue: BidContextType = {
   setBidValue: () => {},
   bidValue: 0,
   setTargetProduct: () => {},
   targetProduct: null,
   addBid: async () => 0,
   setBidMessage: () => {},
   bidMessage: ''
}

export const BidContext = createContext(defaultContextValue);

export const BidProvider = ({ children }: AccountProviderProps) => {
   
   const [targetProduct, setTargetProduct] = useState<ProductTemplateProps | null>(null);
   const [bidValue, setBidValue] = useState(0);
   const [bidMessage, setBidMessage] = useState('');

   const { account } = useContext(AccountContext);

   const addBid = async (): Promise<number> => {
      try {
         const url = `https://arthur-leilao-api-production.up.railway.app/api/bid/account/${account?.id}/product/${targetProduct?.id}`;
         const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               bid_value: bidValue,
               bid_message: bidMessage
            })
         });

         return response.status;
      } catch (e) {
         console.error(e);
         return 500;
      }
   }

   const contextValue: BidContextType = {
      bidValue, setBidValue, targetProduct, setTargetProduct, addBid, bidMessage, setBidMessage
   }

    return <BidContext.Provider value={contextValue} >
        {children}
    </BidContext.Provider>
}